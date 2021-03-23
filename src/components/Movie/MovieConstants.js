export const movieModifier = {
    title: 'movie_show-title',
    genres: 'movie_show-genres',
    default: '',
};

export const voteModifier = (value) => {
    if (value === 0) return 'vote-average_empty';
    if (value > 0 && value <= 3) return 'vote-average_very-low';
    if (value > 3 && value <= 5) return 'vote-average_low';
    if (value > 5 && value <= 7) return 'vote-average_normal';
    return 'vote-average_nice';
};
