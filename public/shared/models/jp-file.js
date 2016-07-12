"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Rx_1 = require('rxjs/Rx');
var ManagedFile = (function () {
    function ManagedFile(attributes, idx) {
        Object.assign(this, attributes);
        this.idx = idx;
        if (attributes._file) {
            var file = attributes._file;
            this.filename = file.name;
            this.size = file.size;
            this.mimetype = file.type;
            this.extension = file.name.split('.').pop();
            this.created_at = this.last_modified = file.lastModifiedDate;
            if (file['webkitRelativePath']) {
                this.webkitRelativePath = file['webkitRelativePath'];
            }
        }
        console.warn('ManagedFile constructed ...', this);
    }
    ManagedFile.prototype.date = function () {
        return this.created_at || this.last_modified;
    };
    ManagedFile.prototype.filesize = function (units) {
        if (units === void 0) { units = 'kb'; }
        var divisor = 10;
        switch (units) {
            case 'mb':
                divisor = 100;
                break;
        }
        return Math.round(this.size / divisor) / 100;
    };
    ManagedFile.prototype.map = function (mapFn) {
        var _this = this;
        var keys = Object.keys(this);
        keys.forEach(function (key) { return mapFn.apply(_this, [key, _this[key]]); });
    };
    return ManagedFile;
}());
exports.ManagedFile = ManagedFile;
var ManagedImage = (function (_super) {
    __extends(ManagedImage, _super);
    function ManagedImage(attributes, idx) {
        _super.call(this, attributes, idx);
        console.warn('ManagedImage constructed ...', this);
    }
    ManagedImage.prototype.read = function () {
        var file = this._file;
        console.info('ManagedImage # read file: start', file);
        var filename = file.name;
        return Rx_1.Observable.create(function (observer) {
            console.debug('ManagedImage # read file: working', file);
            var reader = new FileReader();
            reader.onload = function (readerEvt) {
                console.debug('ManagedImage # read file: complete');
                observer.next(reader.result);
            };
            setTimeout(function () { return reader.readAsDataURL(file); }, 50);
        });
    };
    ManagedImage.prototype.load = function (imageEl) {
        console.debug('ManagedImage.load start');
        return Rx_1.Observable.create(function (observer) {
            console.debug('ManagedImage.load subscription start');
            imageEl.onload = function (e) {
                console.debug('ManagedImage.load on load returned ', e);
                observer.next({ width: imageEl.naturalWidth, height: imageEl.naturalHeight });
            };
        });
    };
    ManagedImage.prototype.watchForDimensions = function (imageEl) {
        var _this = this;
        this.load(imageEl).subscribe(function (e) {
            _this.width = e.width;
            _this.height = e.height;
            console.debug('ManagedImage.load subscription done', _this);
        });
    };
    ManagedImage.prototype.megapixels = function () {
        return Math.round((this.width * this.height) / 10000) / 100;
    };
    return ManagedImage;
}(ManagedFile));
exports.ManagedImage = ManagedImage;

//# sourceMappingURL=jp-file.js.map