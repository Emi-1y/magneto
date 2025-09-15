# Jobsy - Simulador de Entrevistas Gamificado

## Descripción

Jobsy es una aplicación web gamificada que prepara candidatos para entrevistas de trabajo mediante un motor de simulación interactivo. La aplicación incluye un sistema de niveles, insignias, misiones semanales y análisis detallado del rendimiento.

## Características Principales

- **Sistema de Autenticación**: Registro e inicio de sesión de usuarios
- **Configuración de Perfil**: Experiencia laboral, sector objetivo, habilidades
- **Dashboard Gamificado**: Sistema de niveles, insignias y misiones semanales
- **Simulador de Entrevistas**: Preguntas personalizadas por categoría y nivel
- **Modo de Entrenamiento**: Práctica libre con preguntas favoritas e historial
- **Estadísticas Detalladas**: Análisis de rendimiento y áreas de mejora
- **Diseño Responsivo**: Funciona en desktop y dispositivos móviles

## Tecnologías Utilizadas

- **Frontend**: React 18 con TypeScript
- **Estilos**: Tailwind CSS v4.0
- **Componentes UI**: Shadcn/UI
- **Íconos**: Lucide React
- **Almacenamiento**: LocalStorage (para desarrollo)
- **Bundler**: Vite (asumido por el entorno)

## Requisitos Previos

- Node.js (versión 16 o superior)
- npm o yarn
- Un navegador moderno

## Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd jobsy
```

### 2. Instalar Dependencias

```bash
npm install
```

O si usas yarn:

```bash
yarn install
```

### 3. Instalar Dependencias Específicas

La aplicación utiliza las siguientes dependencias principales:

```bash
# Dependencias de React y TypeScript
npm install react react-dom typescript

# Tailwind CSS v4.0
npm install tailwindcss@next @tailwindcss/typography

# Componentes UI
npm install @radix-ui/react-slot @radix-ui/react-separator
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install @radix-ui/react-select @radix-ui/react-checkbox
npm install @radix-ui/react-progress @radix-ui/react-avatar
npm install @radix-ui/react-tabs @radix-ui/react-accordion

# Íconos
npm install lucide-react

# Utilidades
npm install class-variance-authority clsx tailwind-merge
```

### 4. Configurar Variables de Entorno (Opcional)

Si planeas conectar APIs externas, crea un archivo `.env.local`:

```bash
# APIs externas (opcional)
REACT_APP_API_URL=http://localhost:3001
REACT_APP_OPENAI_API_KEY=your_openai_key_here
```

### 5. Ejecutar la Aplicación

```bash
npm run dev
```

O con yarn:

```bash
yarn dev
```

La aplicación estará disponible en `http://localhost:5173`

## Estructura del Proyecto

```
jobsy/
├── components/           # Componentes React
│   ├── ui/              # Componentes base de Shadcn/UI
│   ├── AuthForm.tsx     # Formulario de autenticación
│   ├── UserSetup.tsx    # Configuración inicial del usuario
│   ├── Dashboard.tsx    # Dashboard principal
│   ├── ProfileEdit.tsx  # Edición de perfil
│   └── InterviewSimulator.tsx  # Simulador de entrevistas
├── hooks/               # Custom hooks
│   └── useAuth.ts       # Hook de autenticación
├── types/               # Definiciones de TypeScript
│   └── user.ts          # Tipos de usuario y datos
├── data/                # Datos mock y configuración
│   └── mockData.ts      # Datos de ejemplo
├── styles/              # Estilos globales
│   └── globals.css      # CSS global con Tailwind
├── App.tsx              # Componente principal
└── README.md            # Este archivo
```

## Uso de la Aplicación

### 1. Registro/Login
- Abre la aplicación en tu navegador
- Crea una nueva cuenta o inicia sesión
- Los datos se almacenan localmente en localStorage

### 2. Configuración de Perfil
- Completa tu experiencia laboral
- Selecciona tu sector objetivo
- Elige tus habilidades principales
- Define áreas a mejorar

### 3. Dashboard Principal
- Navega por el mapa de niveles
- Haz clic en tu nivel actual para iniciar entrevistas
- Revisa tus insignias y misiones semanales
- Edita tu perfil desde el panel lateral

### 4. Modo Entrenamiento
- Practica con diferentes categorías de preguntas
- Accede a tus preguntas favoritas
- Revisa tu historial de entrevistas
- Entrena habilidades específicas

### 5. Estadísticas
- Visualiza tu progreso general
- Identifica áreas de mejora
- Sigue tu evolución en el tiempo

## Personalización y Desarrollo

### Agregar Nuevas Preguntas

Edita el archivo `/data/mockData.ts`:

```typescript
export const mockQuestions: Question[] = [
  {
    id: 'nueva-pregunta-1',
    text: '¿Cuál es tu nueva pregunta?',
    category: 'general', // 'soft-skills' | 'technical' | 'general'
    difficulty: 'medium', // 'easy' | 'medium' | 'hard'
    isFavorite: false,
    feedback: 'Feedback de ejemplo',
    score: 0
  },
  // ... más preguntas
];
```

### Modificar Sectores y Habilidades

En `/data/mockData.ts` puedes modificar:

- `workExperienceOptions`: Opciones de experiencia laboral
- `targetSectorOptions`: Sectores disponibles
- `skillsOptions`: Habilidades y competencias

### Personalizar Estilos

Los estilos se controlan desde `/styles/globals.css`. Puedes modificar:

- Variables de color CSS
- Tipografía base
- Espaciado y bordes
- Temas claro/oscuro

### Integrar APIs Reales

Para conectar con APIs reales:

1. **Autenticación**: Modifica `/hooks/useAuth.ts`
2. **Preguntas**: Conecta con tu API de preguntas
3. **Resultados**: Implementa guardado en base de datos
4. **IA**: Integra OpenAI o similar para generar preguntas

## Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Construye la aplicación
npm run preview      # Preview de la build

# Calidad de Código
npm run lint         # Ejecuta ESLint
npm run type-check   # Verifica tipos TypeScript
```

## Solución de Problemas

### Error: Tailwind CSS no carga estilos

1. Verifica que tienes Tailwind CSS v4.0 instalado
2. Revisa que `globals.css` esté importado correctamente
3. Reinstala dependencias: `rm -rf node_modules && npm install`

### Error: Componentes UI no funcionan

1. Verifica que todas las dependencias de Radix UI estén instaladas
2. Asegúrate de que los imports sean correctos
3. Revisa la consola del navegador para errores específicos

### Error: LocalStorage no persiste datos

1. Verifica que no estés en modo incógnito
2. Revisa que el navegador permita localStorage
3. Limpia el localStorage: `localStorage.clear()`

### Error: TypeScript

1. Ejecuta `npm run type-check` para ver errores específicos
2. Verifica que todas las importaciones tengan tipos correctos
3. Revisa que las interfaces en `/types/user.ts` estén actualizadas

## Próximos Pasos de Desarrollo

### Funcionalidades Sugeridas

1. **Backend Real**
   - API REST o GraphQL
   - Base de datos para usuarios y resultados
   - Autenticación JWT

2. **IA y Machine Learning**
   - Generación de preguntas personalizadas
   - Análisis de respuestas con NLP
   - Feedback automatizado

3. **Características Avanzadas**
   - Grabación y análisis de audio
   - Video entrevistas simuladas
   - Análisis de lenguaje corporal

4. **Gamificación Extendida**
   - Más tipos de insignias
   - Tabla de clasificaciones
   - Competencias entre usuarios

5. **Métricas y Analytics**
   - Dashboard para administradores
   - Análisis de uso y rendimiento
   - Reportes exportables

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request


## Soporte

Si encuentras problemas o tienes preguntas:

1. Revisa esta documentación
2. Busca en los issues existentes
3. Crea un nuevo issue con detalles específicos
4. Incluye información del navegador y versión de Node.js

---

**¡Gracias por usar Jobsy! 🚀**