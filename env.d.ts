declare namespace NodeJS {
    interface ProcessEnv {
      API_URL: string;
      // Adicione outras variáveis de ambiente aqui
    }
  
    interface Process {
      env: ProcessEnv;
    }
  }
  
  