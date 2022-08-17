var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
source.getResource = function (movieInfo, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    var parseToken, timestamp, PROVIDER, DOMAIN, urlSearch, parseSearch, LINK_DETAIL, TYPE_FILM, filmId, urlDetail, resultDetail, data, tracks, _i, _a, trackItem, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                parseToken = function (f) {
                    for (var g = decodeURIComponent(escape(libs.string_atob(f.replace(/[a-zA-Z]/g, function (a) {
                        return String.fromCharCode(("Z" >= a ? 90 : 122) >= (a = a.charCodeAt(0) + 13) ? a : a - 26);
                    })))), k = [], l = 0; l < g.length; l++) {
                        var m = g.charCodeAt(l);
                        k[l] = 33 <= m && 126 >= m ? String.fromCharCode(33 + (m + 14) % 94) : String.fromCharCode(m);
                    }
                    var v = k.join("");
                    var jsonResp = JSON.parse(v);
                    return jsonResp;
                };
                timestamp = Date.now();
                PROVIDER = 'SFLIXTOR';
                DOMAIN = "https://flixtor.to";
                urlSearch = DOMAIN + "/ajax/show/search/" + libs.url_slug_search(movieInfo, '%20') + "/from/1900/to/2099/rating/0/votes/0/language/all/type/all/genre/all/relevance/page/1?_=" + timestamp;
                return [4, libs.request_get(urlSearch, {}, true)];
            case 1:
                parseSearch = _b.sent();
                LINK_DETAIL = '';
                TYPE_FILM = '';
                libs.log({ urlSearch: urlSearch, length: parseSearch('.cflip.m-0.link2').length }, PROVIDER, 'SEARCH');
                parseSearch('.cflip.m-0.link2').each(function (key, item) {
                    var title = parseSearch(item).find('.card-text.title').text();
                    var href = parseSearch(item).attr('data-href');
                    var year = parseSearch(item).find('.card-text.t12').text();
                    var type = '';
                    if (href && href.indexOf('/movie/') !== -1) {
                        type = 'movie';
                    }
                    else if (href && href.indexOf('/tv/') !== -1) {
                        type = 'tv';
                    }
                    libs.log({ title: title, href: href, year: year, type: type }, PROVIDER, 'SEARCH ITEM');
                    if (title && href && !LINK_DETAIL && type) {
                        if (libs.string_matching_title(movieInfo, title)) {
                            if (movieInfo.type == 'tv' && type.toLowerCase() == 'tv') {
                                LINK_DETAIL = "" + DOMAIN + href;
                                TYPE_FILM = type;
                            }
                            if (movieInfo.type == 'movie' && type.toLowerCase() == 'movie' && movieInfo.year == year) {
                                LINK_DETAIL = "" + DOMAIN + href;
                                TYPE_FILM = type;
                            }
                        }
                    }
                });
                libs.log(LINK_DETAIL, PROVIDER, "LINK DETAIL");
                if (!LINK_DETAIL) {
                    return [2];
                }
                filmId = '';
                if (TYPE_FILM == 'movie') {
                    filmId = LINK_DETAIL.match(/\/movie\/([0-9]+)/i);
                    filmId = filmId ? filmId[1] : '';
                }
                else {
                    filmId = LINK_DETAIL.match(/\/tv\/([0-9]+)/i);
                    filmId = filmId ? filmId[1] : '';
                }
                libs.log({ filmId: filmId, TYPE_FILM: TYPE_FILM }, PROVIDER, "FILM ID");
                if (!filmId) {
                    return [2];
                }
                urlDetail = '';
                if (TYPE_FILM == 'movie') {
                    urlDetail = DOMAIN + "/ajax/v4/m/" + filmId + "?_=" + timestamp;
                }
                else {
                    urlDetail = DOMAIN + "/ajax/v4/e/" + filmId + "/" + movieInfo.season + "/" + movieInfo.episode + "?_=" + timestamp;
                }
                return [4, libs.request_get(urlDetail, {}, false)];
            case 2:
                resultDetail = _b.sent();
                libs.log(resultDetail, PROVIDER, 'AJAX DETAIL');
                _b.label = 3;
            case 3:
                _b.trys.push([3, 6, , 7]);
                data = parseToken(resultDetail);
                libs.log(data, PROVIDER, 'PARSE DATA');
                tracks = [];
                if (data && data.tracks) {
                    for (_i = 0, _a = data.tracks; _i < _a.length; _i++) {
                        trackItem = _a[_i];
                        tracks.push({
                            file: trackItem.file,
                            label: trackItem.label,
                            kind: trackItem.kind
                        });
                    }
                }
                if (!(data && data.file && data.file.indexOf('m3u8') != -1)) return [3, 5];
                return [4, libs.parse_size(data.file, PROVIDER, PROVIDER, TYPE_FILM, callback, 1, tracks)];
            case 4:
                _b.sent();
                _b.label = 5;
            case 5: return [3, 7];
            case 6:
                e_1 = _b.sent();
                libs.log(String(e_1), PROVIDER, 'PARSE ERROR');
                return [3, 7];
            case 7: return [2, true];
        }
    });
}); };
