export const movieModifier = {
    title: 'movie--title',
    genres: 'movie--genres',
    default: '',
};

export const voteModifier = (value) => {
    if (value === 0) return 'vote-average--empty';
    if (value > 0 && value <= 3) return 'vote-average--very-low';
    if (value > 3 && value <= 5) return 'vote-average--low';
    if (value > 5 && value <= 7) return 'vote-average--normal';
    return 'vote-average--nice';
};
