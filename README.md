# AgentMarket - AI Agent Marketplace

A clean, dark-themed AI agent marketplace MVP built with Next.js, shadcn/ui, and OpenRouter.

## Features

- 🤖 **6 Specialized AI Agents**: Code Reviewer, Creative Writer, Data Analyst, Legal Advisor, Marketing Guru, Math Tutor
- 💬 **Real-time Chat**: Chat interface with streaming responses
- 🎨 **Clean Dark Theme**: Minimal, no-gradient UI design
- 🔍 **Search & Filter**: Find agents by category or search terms
- ⚡ **Fast & Responsive**: Built with Next.js App Router
- 📁 **File Upload**: Support for PDFs, images, text files, and code files
- 🐳 **Docker Ready**: Full Docker and Docker Compose support

## Tech Stack

- **Framework**: Next.js 15 + React 19
- **Styling**: Tailwind CSS + shadcn/ui
- **AI**: OpenRouter API (arcee-ai/trinity-large-preview:free)
- **Theme**: next-themes (dark mode default)
- **Containerization**: Docker + Docker Compose

## Quick Start

### Option 1: Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and add your OpenRouter API key:
   ```
   OPENROUTER_API_KEY=your_key_here
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Open** [http://localhost:3000](http://localhost:3000)

### Option 2: Docker (Recommended for College Projects)

#### Development with Docker Compose

1. **Make sure your `.env.local` has the API key**:
   ```bash
   # Check if file exists
   cat .env.local
   ```

2. **Build and run with Docker Compose**:
   ```bash
   docker-compose up --build
   ```

3. **Access the app**:
   - App: http://localhost:3000

4. **Stop the container**:
   ```bash
   docker-compose down
   ```

#### Production Deployment with Docker

1. **Build production image**:
   ```bash
   docker-compose -f docker-compose.prod.yml up --build
   ```

2. **Run with nginx (optional)**:
   ```bash
   docker-compose --profile production up --build
   ```
   - App will be available on http://localhost (port 80)

#### Docker Commands Reference

```bash
# Build image
docker build -t agent-marketplace .

# Run container
docker run -p 3000:3000 --env-file .env.local agent-marketplace

# View logs
docker-compose logs -f

# Rebuild after changes
docker-compose up --build

# Stop all containers
docker-compose down

# Remove volumes (clean start)
docker-compose down -v
```

## Project Structure

```
app/
  ├── api/chat/route.ts    # OpenRouter API integration
  ├── layout.tsx           # Root layout with theme provider
  ├── page.tsx             # Main marketplace page
  └── globals.css          # Global styles
components/
  ├── ui/                  # shadcn components
  ├── theme-provider.tsx   # Dark mode provider
  ├── header.tsx           # Navigation header
  ├── agent-card.tsx       # Agent display card
  └── chat-interface.tsx   # Chat UI component
lib/
  ├── types.ts             # TypeScript types
  └── data.ts              # Agent data
Dockerfile                 # Docker configuration
docker-compose.yml         # Docker Compose for dev
docker-compose.prod.yml    # Docker Compose for prod
nginx.conf                 # Nginx configuration
```

## Adding Your OpenRouter API Key

1. Go to [openrouter.ai/keys](https://openrouter.ai/keys)
2. Create a free account
3. Copy your API key
4. Paste it in `.env.local`:
   ```
   OPENROUTER_API_KEY=sk-or-v1-...
   ```

## Customization

- Add more agents in `lib/data.ts`
- Modify the system prompts for each agent
- Customize the theme in `app/globals.css`
- Adjust the model in `app/api/chat/route.ts`

## File Upload Support

The app supports uploading:
- **Images** (PNG, JPG, JPEG) - displayed in chat
- **PDFs** - text is extracted and analyzed
- **Text files** (TXT, MD, CSV) - content read directly
- **Code files** (JS, TS, JSX, TSX, PY, JSON) - syntax highlighted

Max file size: 5MB per file

## Docker for College Projects

This setup is perfect for college submissions because:
- ✅ **Portable**: Works on any system with Docker
- ✅ **Consistent**: Same environment everywhere
- ✅ **Easy to demo**: Just run `docker-compose up`
- ✅ **Production ready**: Includes nginx reverse proxy

### For Project Submission

Include these files in your submission:
1. Source code (this directory)
2. `Dockerfile` and `docker-compose.yml`
3. `README.md` (this file)
4. `.env.example` (without real API key)

**Setup Instructions for Evaluator**:
```bash
# 1. Extract project
# 2. Add API key to .env.local
echo "OPENROUTER_API_KEY=your_key" > .env.local

# 3. Run with Docker
docker-compose up

# 4. Open browser to http://localhost:3000
```

## License

MIT - For hackathon and educational use
