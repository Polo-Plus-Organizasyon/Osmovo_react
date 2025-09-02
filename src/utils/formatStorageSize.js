// Helper to format storage sizes (input in bytes) into MB or GB
export default function formatStorageSize(bytes) {
  if (bytes === 0 || bytes === '0') return '0 MB';
  if (!bytes) return '0 MB';

  const mb = bytes / 1024 / 1024;

  if (mb >= 1024) {
    const gb = mb / 1024;
    return `${parseFloat(gb.toFixed(2))} GB`;
  }

  return `${parseFloat(mb.toFixed(2))} MB`;
}


