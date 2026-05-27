function concatValues(obj) {
    var value = "";
    for (var prop in obj) {
        value += obj[prop];
    }
    return value;
}

function cleanText(text) {
    const cleanedText = text.toLowerCase().replace(/[^a-z0-9]/g, "");

    return cleanedText;
}

function filterGameListByCategory(GamesList, Category) {
    let GamesListFiltered = Object.entries(GamesList).filter(([_, game]) => game.category.includes(Category));
    GamesListFiltered = Object.fromEntries(GamesListFiltered);
    return GamesListFiltered;
}

function prefilterGameList(GamesList, PrefilterList) {
    let GamesListFiltered = Object.entries(GamesList).filter(([_, game]) => PrefilterList.some((f) => game.category.includes(f.category)));
    GamesListFiltered = Object.fromEntries(GamesListFiltered);
    return GamesListFiltered;
}

function prefixGameList(GamesList, PrefixList) {
    // Preprocess Games List
    let GamesListFiltered = Object.entries(GamesList).map(([key, game]) => {
        const filter = PrefixList.find((f) => game.category.includes(f.category));

        // Modify the tag with the prefix
        return [
            key,
            {
                ...game,
                tag: filter && filter.prefix ? filter.prefix + (game.tag ? " - " + game.tag : "") : game.tag,
            },
        ];
    });
    GamesListFiltered = Object.fromEntries(GamesListFiltered);
    return GamesListFiltered;
}

function getYearMonthDifference(startDate, endDate, roundUp = false) {
    if (endDate < startDate) {
        [startDate, endDate] = [endDate, startDate];
    }

    let startYear = startDate.getFullYear();
    let startMonth = startDate.getMonth();
    let startDay = startDate.getDate();

    let endYear = endDate.getFullYear();
    let endMonth = endDate.getMonth();
    let endDay = endDate.getDate();

    let yearDiff = endYear - startYear;
    let monthDiff = endMonth - startMonth;
    let dayDiff = endDay - startDay;

    // If endDay is earlier than startDay, subtract one month
    if (dayDiff < 0) {
        monthDiff -= 1;

        if (roundUp) {
            // When rounding up, check if the date is close enough to the next full month
            // We do this by creating a date one month after the start and comparing the difference
            const nextMonthDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, startDay);
            const diffInDays = Math.ceil((endDate - nextMonthDate) / (1000 * 60 * 60 * 24));

            // If less than 5 days remain to complete a month, round up
            if (diffInDays >= -5 && diffInDays < 0) {
                monthDiff += 1;
            }
        }
    }

    // Normalize negative monthDiff if needed
    if (monthDiff < 0) {
        yearDiff -= 1;
        monthDiff += 12;
    }

    // Additional round-up if days are close to completing another month
    if (roundUp && dayDiff >= 0 && endDay !== startDay) {
        const daysInMonth = new Date(endYear, endMonth + 1, 0).getDate();
        const threshold = Math.floor(daysInMonth * 0.9); // e.g., 90% of 31 days is 28

        if (dayDiff >= threshold) {
            monthDiff += 1;
            if (monthDiff >= 12) {
                yearDiff += 1;
                monthDiff -= 12;
            }
        }
    }

    const parts = [];
    if (yearDiff > 0) parts.push(`${yearDiff} year${yearDiff > 1 ? "s" : ""}`);
    if (monthDiff > 0) parts.push(`${monthDiff} month${monthDiff > 1 ? "s" : ""}`);

    return parts.length > 0 ? parts.join(" ") : "0 months";
}

export { concatValues, cleanText, getYearMonthDifference, prefixGameList, prefilterGameList, filterGameListByCategory };
