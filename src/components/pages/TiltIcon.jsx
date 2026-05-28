"use client";

import { useRef } from "react";
import styles from "@styles/pages/experience.module.scss";

export const TiltIcon = ({ logo, name }) => {
    const iconRef = useRef(null);
    const pressRef = useRef(null);

    const handleMouseMove = (e) => {
        const el = iconRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
        el.style.transition = 'box-shadow 0.25s ease';
        el.style.transform = `perspective(200px) rotateX(${-y * 15}deg) rotateY(${x * 15}deg) scale(1.3)`;
    };

    const handleMouseLeave = () => {
        const el = iconRef.current;
        if (!el) return;
        el.style.transition = 'transform 0.35s ease, box-shadow 0.25s ease';
        el.style.transform = '';
        pressRef.current?.classList.remove(styles['icon-pressed']);
    };

    const handleMouseDown = () => pressRef.current?.classList.add(styles['icon-pressed']);
    const handleMouseUp = () => pressRef.current?.classList.remove(styles['icon-pressed']);

    return (
        <div
            ref={iconRef}
            className={styles["icon-tilt"]}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <div ref={pressRef} className={styles["icon"]}>
                <img src={logo} alt={name} />
            </div>
        </div>
    );
};
