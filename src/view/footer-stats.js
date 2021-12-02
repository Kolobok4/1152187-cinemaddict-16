export const createFooterStatsTemplate = (stats) => {
  const {filmCount} = stats;
  return (
    `
    <p>${filmCount} movies inside</p>
  `
  );
};
