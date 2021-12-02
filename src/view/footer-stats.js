export const createFooterStatsTemplate = (stats) => {
  const {filmsCount} = stats;
  return (
    `
    <p>${filmsCount} movies inside</p>
  `
  );
};
