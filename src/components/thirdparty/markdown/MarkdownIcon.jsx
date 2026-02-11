import React from "react";

import { Icon } from "@src/components/common/Icon";

export const MarkdownIcon = ({ children }) => {

    let config = {};
    if (typeof children === "string") {
        try { config = JSON.parse(children); } catch (e) { }
    }

    const { iconType, icon } = config;

    return (
        <Icon iconType={iconType} icon={icon} />
    );
}
