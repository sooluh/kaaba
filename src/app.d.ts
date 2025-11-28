/// <reference types="@sveltejs/kit" />

declare module '*.scss' {
  const content: string
  export default content
}

declare global {
  namespace App {}
}

export {}
