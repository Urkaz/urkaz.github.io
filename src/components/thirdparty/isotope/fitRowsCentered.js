let registered = false;

export async function registerFitRowsCentered() {
    if (registered) return;
    registered = true;

    const LayoutMode = (await import("isotope-layout/js/layout-mode")).default;
    const FitRowsCentered = LayoutMode.create("fitRowsCentered");
    const proto = FitRowsCentered.prototype;

    proto._resetLayout = function () {
        this.x = 0;
        this.y = 0;
        this.maxY = 0;
        this._getMeasurement("gutter", "outerWidth");
        this.centerX = [];
        this.currentRow = 0;
        this.initializing = true;

        const items = this.isotope.filteredItems;
        for (let i = 0; i < items.length; i++) {
            this._getItemLayoutPosition(items[i]);
        }

        if (this.centerX[this.currentRow]) {
            this.centerX[this.currentRow].offset =
                (this.isotope.size.innerWidth + this.gutter - this.x) / 2;
        }

        this.initializing = false;
        this.currentRow = 0;
        this.x = 0;
        this.y = 0;
        this.maxY = 0;
        this._getMeasurement("gutter", "outerWidth");
    };

    proto._getItemLayoutPosition = function (item) {
        item.getSize();
        const itemWidth = item.size.outerWidth + this.gutter;
        const containerWidth = this.isotope.size.innerWidth + this.gutter;

        if (this.x !== 0 && itemWidth + this.x > containerWidth) {
            if (this.initializing) {
                this.centerX[this.currentRow].offset = (containerWidth - this.x) / 2;
            }
            this.currentRow++;
            this.x = 0;
            this.y = this.maxY;
        }

        if (this.initializing && this.x === 0) {
            this.centerX.push({ offset: 0 });
        }

        const offset = this.centerX[this.currentRow]?.offset ?? 0;
        const position = {
            x: this.x + (this.initializing ? 0 : offset),
            y: this.y,
        };

        this.maxY = Math.max(this.maxY, this.y + item.size.outerHeight);
        this.x += itemWidth;

        return position;
    };

    proto._getContainerSize = function () {
        return { height: this.maxY };
    };
}
