"use client";

export const FilterItem = ({ onClick, name, img, className }) => {
    return (
        <>
            <li onClick={onClick} className={className}>
                {name ? (
                    <>{name}</>
                ) : (
                    <img
                        src="/img/icons/empty.png"
                        style={{
                            WebkitMaskImage: `url(${img})`,
                            maskImage: `url(${img})`,
                        }}
                    />
                )}
            </li>
        </>
    );
};
