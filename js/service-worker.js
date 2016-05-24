/**
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren */
'use strict';





/* eslint-disable quotes, comma-spacing */
var PrecacheConfig = [["css/style.css","e29c3b32816a269394fa5b930169489b"],["img/adam.jpg","b445da3cc203f97bce534fdad93b3931"],["img/ben.png","2d983b2362f6db11855af918c7f95aee"],["img/ionic.png","251ebf03b1c7889cf36cbcbcce8f689e"],["img/max.png","66572ace014ac9119866c3190c8a0a03"],["img/mike.png","14650dc9e2aa1661facc830ab5fb7d6a"],["img/perry.png","2f6e587dfaf552ec19045b4719bc534c"],["index.html","802476fe9a0b5005ac3db677bf1de03b"],["index_copia.html","59a9924de379f2bd9e8bcbe509ea1d70"],["js/app.js","30cdbb71f9d87d5fa01ae53d5ec49c00"],["js/app.min.js","9efde348dec7b33ef282b122ca2637d8"],["js/controllers.js","d786b0dd33db70432974fa716ab95254"],["js/controllers.min.js","2732d2dde7f18982ffd2e969425afaa3"],["js/service-worker-registration.js","c1ee5aec388e1ed07d6d290693b72547"],["js/services.js","9a560c1695c45233db59d842bf97882a"],["js/services.min.js","d5c532309ea0b05a563277a4b1eb38d7"],["lib/ionic/css/ionic.css","169725e0bb0f1b3a3780a38358815836"],["lib/ionic/css/ionic.min.css","49f66e19303768d9ea65179deefe394b"],["lib/ionic/fonts/ionicons.eot","2c2ae068be3b089e0a5b59abb1831550"],["lib/ionic/fonts/ionicons.svg","c037dbbc0e6790f30e824a50010df5fb"],["lib/ionic/fonts/ionicons.ttf","24712f6c47821394fba7942fbb52c3b2"],["lib/ionic/fonts/ionicons.woff","05acfdb568b3df49ad31355b19495d4a"],["lib/ionic/js/angular-ui/angular-ui-router.js","749a18f80f375e3049975f190a7bfc4e"],["lib/ionic/js/angular-ui/angular-ui-router.min.js","04c594b762aba521277ee747b28745d5"],["lib/ionic/js/angular/angular-animate.js","9385b61d5fbebd5b25ab313def614381"],["lib/ionic/js/angular/angular-animate.min.js","71a13fcafc6dd1842745494a3cf43962"],["lib/ionic/js/angular/angular-resource.js","711753d2e17e6871f57474d0ebfbb152"],["lib/ionic/js/angular/angular-resource.min.js","ebe5a10de15c3b9b25b49b5d84102973"],["lib/ionic/js/angular/angular-sanitize.js","305a6f71693bdf21e21cd09f24b2c4d6"],["lib/ionic/js/angular/angular-sanitize.min.js","9f8ca450f716142c9a06790953fb2532"],["lib/ionic/js/angular/angular.js","28c75087388cf69bbaabd3a954d73138"],["lib/ionic/js/angular/angular.min.js","9a495e66b349fd238c80c7446529be1f"],["lib/ionic/js/ionic-angular.js","b7250cf58b3e0f81bef21ffddb424523"],["lib/ionic/js/ionic-angular.min.js","b95298e98c5acbcaef4bf36ad85f5ef7"],["lib/ionic/js/ionic.bundle.min.js","34f01b72689414a224badd9089566158"],["lib/ionic/js/ionic.js","bd36363bef2c9880bdadc12ad2cfc42c"],["lib/ionic/js/ionic.min.js","a8c2d723002b87647bc67c088c9600a5"],["lib/ionic/version.json","f6023cc228b1aed6eb51c64d997a26d4"],["templates/chat-detail.html","910b860c578f40376c156b41cd81ffff"],["templates/tab-account.html","682aff2299f8759572cc39f056bf495e"],["templates/tab-chats.html","30f68fffccb4b1022ef033a2f0282fb7"],["templates/tab-dash.html","d7c7ee8bc8dc91e40e56a287ae27d2a6"],["templates/tabs.html","28571bd75830d5ffd98988a7befd0384"]];
/* eslint-enable quotes, comma-spacing */
var CacheNamePrefix = 'sw-precache-v1--' + (self.registration ? self.registration.scope : '') + '-';


var IgnoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var getCacheBustedUrl = function (url, now) {
    now = now || Date.now();

    var urlWithCacheBusting = new URL(url);
    urlWithCacheBusting.search += (urlWithCacheBusting.search ? '&' : '') +
      'sw-precache=' + now;

    return urlWithCacheBusting.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var populateCurrentCacheNames = function (precacheConfig,
    cacheNamePrefix, baseUrl) {
    var absoluteUrlToCacheName = {};
    var currentCacheNamesToAbsoluteUrl = {};

    precacheConfig.forEach(function(cacheOption) {
      var absoluteUrl = new URL(cacheOption[0], baseUrl).toString();
      var cacheName = cacheNamePrefix + absoluteUrl + '-' + cacheOption[1];
      currentCacheNamesToAbsoluteUrl[cacheName] = absoluteUrl;
      absoluteUrlToCacheName[absoluteUrl] = cacheName;
    });

    return {
      absoluteUrlToCacheName: absoluteUrlToCacheName,
      currentCacheNamesToAbsoluteUrl: currentCacheNamesToAbsoluteUrl
    };
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var mappings = populateCurrentCacheNames(PrecacheConfig, CacheNamePrefix, self.location);
var AbsoluteUrlToCacheName = mappings.absoluteUrlToCacheName;
var CurrentCacheNamesToAbsoluteUrl = mappings.currentCacheNamesToAbsoluteUrl;

function deleteAllCaches() {
  return caches.keys().then(function(cacheNames) {
    return Promise.all(
      cacheNames.map(function(cacheName) {
        return caches.delete(cacheName);
      })
    );
  });
}

self.addEventListener('install', function(event) {
  var now = Date.now();

  event.waitUntil(
    caches.keys().then(function(allCacheNames) {
      return Promise.all(
        Object.keys(CurrentCacheNamesToAbsoluteUrl).filter(function(cacheName) {
          return allCacheNames.indexOf(cacheName) === -1;
        }).map(function(cacheName) {
          var urlWithCacheBusting = getCacheBustedUrl(CurrentCacheNamesToAbsoluteUrl[cacheName],
            now);

          return caches.open(cacheName).then(function(cache) {
            var request = new Request(urlWithCacheBusting, {credentials: 'same-origin'});
            return fetch(request).then(function(response) {
              if (response.ok) {
                return cache.put(CurrentCacheNamesToAbsoluteUrl[cacheName], response);
              }

              console.error('Request for %s returned a response with status %d, so not attempting to cache it.',
                urlWithCacheBusting, response.status);
              // Get rid of the empty cache if we can't add a successful response to it.
              return caches.delete(cacheName);
            });
          });
        })
      ).then(function() {
        return Promise.all(
          allCacheNames.filter(function(cacheName) {
            return cacheName.indexOf(CacheNamePrefix) === 0 &&
                   !(cacheName in CurrentCacheNamesToAbsoluteUrl);
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      });
    }).then(function() {
      if (typeof self.skipWaiting === 'function') {
        // Force the SW to transition from installing -> active state
        self.skipWaiting();
      }
    })
  );
});

if (self.clients && (typeof self.clients.claim === 'function')) {
  self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
  });
}

self.addEventListener('message', function(event) {
  if (event.data.command === 'delete_all') {
    console.log('About to delete all caches...');
    deleteAllCaches().then(function() {
      console.log('Caches deleted.');
      event.ports[0].postMessage({
        error: null
      });
    }).catch(function(error) {
      console.log('Caches not deleted:', error);
      event.ports[0].postMessage({
        error: error
      });
    });
  }
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    var urlWithoutIgnoredParameters = stripIgnoredUrlParameters(event.request.url,
      IgnoreUrlParametersMatching);

    var cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    var directoryIndex = 'index.html';
    if (!cacheName && directoryIndex) {
      urlWithoutIgnoredParameters = addDirectoryIndex(urlWithoutIgnoredParameters, directoryIndex);
      cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    }

    var navigateFallback = '';
    // Ideally, this would check for event.request.mode === 'navigate', but that is not widely
    // supported yet:
    // https://code.google.com/p/chromium/issues/detail?id=540967
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1209081
    if (!cacheName && navigateFallback && event.request.headers.has('accept') &&
        event.request.headers.get('accept').includes('text/html') &&
        /* eslint-disable quotes, comma-spacing */
        isPathWhitelisted([], event.request.url)) {
        /* eslint-enable quotes, comma-spacing */
      var navigateFallbackUrl = new URL(navigateFallback, self.location);
      cacheName = AbsoluteUrlToCacheName[navigateFallbackUrl.toString()];
    }

    if (cacheName) {
      event.respondWith(
        // Rely on the fact that each cache we manage should only have one entry, and return that.
        caches.open(cacheName).then(function(cache) {
          return cache.keys().then(function(keys) {
            return cache.match(keys[0]).then(function(response) {
              if (response) {
                return response;
              }
              // If for some reason the response was deleted from the cache,
              // raise and exception and fall back to the fetch() triggered in the catch().
              throw Error('The cache ' + cacheName + ' is empty.');
            });
          });
        }).catch(function(e) {
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});




