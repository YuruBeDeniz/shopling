export const formatDate = (date: Date) => {
    return date.toLocaleString().slice(0,10).split("-").reverse().join(".")
  };