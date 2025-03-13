"use client";

import Image from "next/image"

export const FilterItem = ({ onClick, name, img, className }) => {
    return (
        <>
            <li onClick={onClick} className={className}>
                {name ? (
                    <>{name}</>
                ) : (
                    <Image
                        src="/img/games/platforms/empty.png"
                        style={{
                            WebkitMaskImage: `url(${img})`,
                            maskImage: `url(${img})`,
                        }}
                        alt=""
                    />
                )}
            </li>
        </>
    );
};
