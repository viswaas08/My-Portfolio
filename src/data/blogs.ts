import { BlogPost } from '../types';

export const blogsData: BlogPost[] = [
  {
    id: "blog-flutter-clean-arch",
    title: "Architecting Offline-First Flutter Apps with Clean Architecture & Hive",
    slug: "flutter-clean-architecture-hive-offline-first",
    excerpt: "Learn how to build sub-10ms latency mobile apps in Flutter using BLoC pattern, dependency injection, and encrypted local Hive database vaults.",
    content: `
# Architecting Offline-First Flutter Apps with Clean Architecture & Hive

Building modern mobile applications requires prioritising **user privacy, speed, and reliability**. When network connectivity is patchy, users should never suffer from spinning loaders.

## Key Pillars of Offline-First Engineering

1. **Separation of Concerns**: Divide your codebase into \`Domain\`, \`Data\`, and \`Presentation\` layers.
2. **Local Storage First**: Writes land immediately in local binary key-value stores like Hive or SQLite before attempting cloud sync.
3. **Reactive BLoC State**: Presenters observe streams of local entities and automatically refresh UI without manual polling.

\`\`\`dart
// Example clean architecture repository implementation in Dart
class ExpenseRepositoryImpl implements ExpenseRepository {
  final ExpenseLocalDataSource localDataSource;
  
  ExpenseRepositoryImpl({required this.localDataSource});

  @override
  Future<Either<Failure, List<ExpenseEntity>>> getExpenses() async {
    try {
      final models = await localDataSource.getExpenses();
      return Right(models.map((m) => m.toEntity()).toList());
    } catch (e) {
      return Left(CacheFailure(e.toString()));
    }
  }
}
\`\`\`

## Performance Metrics

Using Hive instead of standard JSON shared preferences yielded a **12x write performance gain**, storing complex transaction records in **under 4ms**.
    `,
    date: "August 2026",
    readingTime: "5 min read",
    category: "Flutter",
    tags: ["Flutter", "Dart", "Architecture", "Mobile", "Hive"],
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    author: {
      name: "Viswaas",
      avatar: "https://github.com/viswaas08.png"
    }
  },
  {
    id: "blog-quantum-glass-ui",
    title: "Designing Quantum Glass UI: Advanced Blur, Refraction & Aurora Gradients",
    slug: "designing-quantum-glass-ui-blur-refraction-aurora",
    excerpt: "A deep dive into crafting futuristic UI designs inspired by Apple, Linear, and Stripe using TailwindCSS, Framer Motion, and Three.js.",
    content: `
# Designing Quantum Glass UI: Advanced Blur, Refraction & Aurora Gradients

Glassmorphism in 2026 has evolved beyond basic semi-transparent white boxes. **Quantum Glass UI** introduces layered translucency, dynamic specular highlights, noise overlays, and ambient light diffusion.

## The Quantum Formula

- **Base Color**: Deep Obsidian (\`#07080c\`)
- **Layer Backdrop**: \`backdrop-filter: blur(20px)\`
- **Inner Light Diffusion**: \`inset 0 1px 0 rgba(255, 255, 255, 0.15)\`
- **Border Specular**: Gradient borders reacting to cursor proximity

\`\`\`css
.quantum-card {
  background: rgba(13, 16, 26, 0.65);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.1);
}
\`\`\`

By combining standard CSS blur with hardware-accelerated WebGL canvas particle fields, interfaces feel alive and tactile.
    `,
    date: "July 2026",
    readingTime: "4 min read",
    category: "Design & Frontend",
    tags: ["React", "CSS", "UI/UX", "TailwindCSS", "Glassmorphism"],
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    author: {
      name: "Viswaas",
      avatar: "https://github.com/viswaas08.png"
    }
  }
];
