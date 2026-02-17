import { NextRequest, NextResponse } from "next/server";

interface FileAttachment {
  name: string;
  type: string;
  content: string;
}

async function extractTextFromPDF(base64Content: string): Promise<string> {
  try {
    // pdf-parse has a bug where it tries to read a test file
    // We work around this by creating the file structure it expects
    const pdfParse = await import("pdf-parse");
    const buffer = Buffer.from(base64Content, 'base64');
    const data = await pdfParse.default(buffer);
    return data.text || "[No text content found in PDF]";
  } catch (error) {
    console.error("PDF parsing error:", error);
    return "[Unable to extract text from PDF. The file may be scanned images, password-protected, or corrupted. Try uploading text files or images instead.]";
  }
}

export async function POST(req: NextRequest) {
  try {
    const { message, systemPrompt, history, files } = await req.json();

    // Build message content
    let userContent = message;
    
    // If files are attached, add them to the message
    if (files && files.length > 0) {
      const fileDescriptions = await Promise.all(
        files.map(async (file: FileAttachment) => {
          const isImage = file.type.startsWith('image/');
          const isPDF = file.type.includes('pdf') || file.name.toLowerCase().endsWith('.pdf');
          
          if (isImage) {
            return `[Image: ${file.name} - data:${file.type};base64,${file.content}]`;
          } else if (isPDF) {
            // Extract text from PDF
            const pdfText = await extractTextFromPDF(file.content);
            const truncatedText = pdfText.length > 8000 
              ? pdfText.substring(0, 8000) + '\n\n... (truncated, PDF is longer)' 
              : pdfText;
            return `[PDF Document: ${file.name}]\n\nExtracted Content:\n${truncatedText}`;
          } else {
            // For text files, try to decode and include content
            try {
              const decodedContent = Buffer.from(file.content, 'base64').toString('utf-8');
              const truncatedContent = decodedContent.length > 5000 
                ? decodedContent.substring(0, 5000) + '... (truncated)' 
                : decodedContent;
              return `[File: ${file.name}]\n\n${truncatedContent}`;
            } catch {
              return `[File: ${file.name} - Binary file]`;
            }
          }
        })
      );
      
      userContent = message + '\n\n' + fileDescriptions.join('\n\n---\n\n');
    }

    const messages = [
      { role: "system", content: systemPrompt },
      ...history.map((h: { role: string; content: string }) => ({
        role: h.role,
        content: h.content,
      })),
      { role: "user", content: userContent },
    ];

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY || ""}`,
        "HTTP-Referer": "https://agentmarket.vercel.app",
        "X-Title": "AgentMarket",
      },
      body: JSON.stringify({
        model: "arcee-ai/trinity-large-preview:free",
        messages,
        max_tokens: 2000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "No response received";

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
