# Contributing to Profile Élegante

Thank you for your interest in contributing to Profile Élegante! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

### 🔧 Development Setup

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/Profile-Elegante.git
   cd Profile-Elegante
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp .env.example .env.local
   
   # Add your environment variables:
   # - NEXTAUTH_SECRET
   # - NEXTAUTH_URL
   # - GOOGLE_CLIENT_ID
   # - GOOGLE_CLIENT_SECRET
   # - CONVEX_DEPLOYMENT
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:3000`

### 🌿 Branch Naming Convention

- `feature/description` - for new features
- `fix/description` - for bug fixes
- `docs/description` - for documentation updates
- `refactor/description` - for code refactoring

### 📝 Commit Message Guidelines

Follow the conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(auth): add Google OAuth integration
fix(ui): resolve mobile responsive issues
docs(readme): update installation instructions
```

### 🔄 Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow existing code style and conventions
   - Add comments for complex logic
   - Ensure responsive design works on all devices

3. **Test your changes**
   ```bash
   npm run build    # Ensure build passes
   npm run lint     # Check for linting errors
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to the original repository on GitHub
   - Click "New Pull Request"
   - Select your branch and provide a clear description
   - Reference any related issues

### 🎨 Code Style Guidelines

- **JavaScript/TypeScript**: Follow the existing ESLint configuration
- **CSS/Tailwind**: Use utility classes consistently
- **Components**: Follow React best practices
- **File naming**: Use PascalCase for components, camelCase for utilities
- **Folder structure**: Keep components organized by feature/type

### 🐛 Reporting Issues

When reporting issues, please include:

1. **Clear description** of the problem
2. **Steps to reproduce** the issue
3. **Expected vs actual behavior**
4. **Screenshots** if applicable
5. **Environment details** (browser, OS, etc.)

### 💡 Feature Requests

For feature requests:

1. **Check existing issues** to avoid duplicates
2. **Provide detailed description** of the feature
3. **Explain the use case** and benefits
4. **Include mockups or examples** if helpful

### 🧪 Testing

- Write tests for new features when applicable
- Ensure existing tests pass
- Test on multiple browsers and devices
- Verify responsive design works correctly

### 📚 Documentation

- Update README.md if your changes affect setup or usage
- Add JSDoc comments for new functions/components
- Update this CONTRIBUTING.md if you change the development process

### 🏆 Recognition

Contributors will be recognized in:
- GitHub contributors page
- Project documentation
- Release notes for significant contributions

## 🚀 Project Structure

```
Profile-Elegante/
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── auth/           # Authentication components
│   ├── form/           # Form components
│   ├── preview/        # Resume preview components
│   └── ui/             # UI components
├── contexts/           # React contexts
├── lib/                # Utility libraries
├── public/             # Static assets
├── types/              # TypeScript type definitions
└── convex/             # Convex database functions
```

## 🔒 Security

If you discover a security vulnerability, please email the maintainer directly rather than opening a public issue.

## 📜 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow the golden rule: treat others as you'd like to be treated

## 🆘 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Email**: Contact the maintainer for urgent matters

---

Thank you for contributing to Profile Élegante! Your efforts help make this project better for everyone. 🎉