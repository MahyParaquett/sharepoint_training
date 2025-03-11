export const formatDate = (dateString: string): string => {
    if (!dateString) return ""; // Verifica se a data é válida
  
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).slice(-2);
    const month = String(date.getUTCMonth() + 1).slice(-2);
    const year = date.getUTCFullYear();
  
    return `${day}/${month}/${year}`;
  }
  