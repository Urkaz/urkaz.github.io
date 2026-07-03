"use client";

import { useEffect, useState } from "react";

import { getYearMonthDifference } from "@components/functions";

const computers = {
    age: ({ birthDateISO }) => {
        const diff_ms = Date.now() - new Date(birthDateISO).getTime();
        return Math.abs(new Date(diff_ms).getUTCFullYear() - 1970);
    },
    duration: ({ startISO, endISO, roundUp }) => {
        const end_date = endISO ? new Date(endISO) : new Date();
        return getYearMonthDifference(new Date(startISO), end_date, roundUp);
    },
};

// Renders a value that depends on the current date/time. SSR/export renders it with
// "initialValue" (computed at build time), then it recomputes once on client mount so
// it stays correct without needing a rebuild.
export default function LiveDate({ type, args, initialValue }) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(computers[type](args));
    }, [type, args]);

    return value;
}
