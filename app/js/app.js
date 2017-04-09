var app = angular.module('hermesMirrorApp', ['ngMaterial', 'ngAnimate', 'ngAria', 'ngRoute', 'ngSanitize', 'mdMarkdownIt', 'vAccordion']);
var githubReleases = 'https://api.github.com/repos/TryHardDood/hermes-mirrors/releases';

app.config(['markdownItConverterProvider', function (markdownItConverter) {
    markdownItConverter.config('default', {
        breaks: true,
        html: true,
        linkify: true
    });
}]);

app.config(function ($routeProvider) {

    $routeProvider.otherwise('/');
    $routeProvider
        .when("/", {
            templateUrl: "app/templates/index.html"
        })
        .when("/index", {
            templateUrl: "app/templates/index.html"
        })
        .when("/faq", {
            templateUrl: "app/templates/faq.html"
        });
});

app.controller('ngAppController', AppController);

function AppController($scope, $http, $timeout, $location, $mdDialog) {
    var self = this;

    self.readonly = false;
    self.selectedItem = null;
    self.searchText = "";
    self.querySearch = querySearch;
    self.tags = loadTags();
    self.selectedTags = [];
    self.numberChips = [];
    self.numberBuffer = '';
    self.autocompleteRequireMatch = false;
    self.transformChip = transformChip;

    function transformChip(chip) {
        if (angular.isObject(chip)) {
            return chip;
        }

        return {
            name: chip
        };
    }

    function removeChip(chip) {
        $scope.$apply();
    }

    function querySearch(query) {
        var results = query ? self.tags.filter(createFilterFor(query)) : [];
        return results;
    }

    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);

        return function filterFn(tags) {
            return (tags._lowername.indexOf(lowercaseQuery) === 0);
        };

    }

    function loadTags() {
        var tags = [{
                'name': 'TWRP',
            },
            {
                'name': 'ROM',
            },
            {
                'name': 'Kernel',
            },
            {
                'name': 'Dinolek',
            },
            {
                'name': 'LineageOS',
            },
            {
                'name': 'ResurrectionRemix',
            },
            {
                'name': 'Marshmallow',
            },
            {
                'name': 'Nougat',
            },
            {
                'name': 'Bule',
            }
        ];

        return tags.map(function (tag) {
            tag._lowername = tag.name.toLowerCase();
            return tag;
        });
    }

    $scope.showShare = function (ev, release) {
        $mdDialog.show({
            template: '<md-dialog layout-padding>' +
                '<h2>Share ' + (!release.name ? release.tag_name : release.name) + '</h2>' +
                '<div layout="row" layout-align="center center">' +
                '<p>' +
                '<md-button ng-style="{color: \'white\', background: \'#1565C0\'}" class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ftryharddood.github.io%2Fhermes-mirrors%2Findex.html%3FreleaseId%3D' + release.id + '&amp;src=sdkpreparse">Share on Facebook</md-button>' +
                '<md-button ng-style="{color: \'white\', background: \'#FF5722\'}" ng-href="https://plus.google.com/share?url=https://tryharddood.github.io/hermes-mirrors/index.html?releaseId=' + release.id + '" target="_blank">Share on Google+</md-button>' +
                '<br/><md-input-container style="margin-top: 50px;">' +
                '<label>Link</label>' +
                '<input value="https://tryharddood.github.io/hermes-mirrors/index.html?releaseId=' + release.id + '">' +
                '</md-input-container>' +
                '<md-button ng-href="https://tryharddood.github.io/hermes-mirrors/index.html?releaseId=' + release.id + '" target="_blank">Link</md-button>' +
                '</p>' +
                '</div>' +
                '</md-dialog>',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        });
    };

    $scope.filterReleases = function () {
        return function (release) {
            if (self.selectedTags.length === 0) return true;

            for (var i = 0; i < self.selectedTags.length; i++) {
                var substring = self.selectedTags[i].name.toLowerCase();
                var tag = release.tag_name.toLowerCase();
                var name = release.name.toLowerCase();
                var releaseid = release.id.toString().toLowerCase();

                if (tag.indexOf(substring) !== -1) {
                    return true;
                } else if (name.indexOf(substring) !== -1) {
                    return true;
                } else if (releaseid.indexOf(substring) !== -1) {
                    return true;
                }
            }
            return false;
        };
    };
    $scope.listOfReleases = null;
    $scope.loading = true;

    $http.get(githubReleases).then(function (response) {
        $scope.listOfReleases = response.data;
        $scope.loading = false;
    });

    if ($location.search().tab) {
        var oldTags = $location.search().tab;
        if (oldTags === "1") {
            self.selectedTags.push(transformChip("Dinolek"));
        } else if (oldTags === "2") {
            self.selectedTags.push(transformChip("Bule"));
        } else if (oldTags === "3") {
            self.selectedTags.push(transformChip("TWRP"));
        } else if (oldTags === "4") {
            self.selectedTags.push(transformChip("Kernel"));
        }
    } else if ($location.search().releaseId) {
        self.selectedTags.push(transformChip($location.search().releaseId));
    } else if ($location.search().tag) {
        self.selectedTags.push(transformChip($location.search().tag));
    }

    $scope.json = {
        "faqData": [{
                "Category": "LineageOS 13",
                "Messages": [{
                        "question": "Camera is crashing.",
                        "answers": [
                            "It's a known bug, you can't do much but wait for the developers to fix it.",
                            "_Note: You're camera is crashing because you have an **s5k3m2** camera or because of the **dpframework**_"
                        ]
                    },
                    {
                        "question": "Audio quality is bad.",
                        "answers": [
                            "If you're using the second test version of Dinolek's rom, you'll need to flash the fix from the release.",
                            "[Click here](https://tryharddood.github.io/hermes-mirrors/index.html?releaseId=5863972)"
                        ]
                    },
                    {
                        "question": "Battery is draining very fast.",
                        "answers": [
                            "**Here's what you can do:**",
                            "* _Clean install the rom._",
                            "* _Use the latest rom from Dinolek._",
                            "* _Remove all unnecessary apps._",
                            "* _Install Greenify, LSpeed or Redmi Note 2 Tool_"
                        ]
                    }
                ]
            },
            {
                "Category": "Ressurrection Remix v5.8.2 - Port version",
                "Messages": [{
                        "question": "Can't unlock the phone",
                        "answers": [
                            "This is a port bug.",
                            "**Here's what you can do:**",
                            "* Wait for an actual build from Dinolek",
                            "* Double tap the power button",
                            "* Call your phone and pick it up, then press the back button. Also install No Lock from Google Play.",
                            "* Revert back to Marshmellow"
                        ]
                    },
                    {
                        "question": "Camera's focus and HDR not working",
                        "answers": [
                            "_You can't do much about it._",
                            "Will be fixed in the near future."
                        ]
                    },
                    {
                        "question": "Camera not working",
                        "answers": [
                            "Flash the fix from the release: ",
                            "[Click here for the release](https://tryharddood.github.io/hermes-mirrors/index.html?releaseId=5897305)"
                        ]
                    },
                    {
                        "question": "Does CM Theme engine works?",
                        "answers": [
                            "_For Nougat there's no CM Theme engine_",
                            "_It's uses Substratum_"
                        ]
                    }
                ]
            },
            {
                "Category": "TWRP",
                "Messages": [{
                    "question": "How to install .img files?",
                    "answers": [
                        "**It's easy**",
                        "* [First click here to learn the basics](http://bfy.tw/Azwa)",
                        "* Then find this link: [Click](https://www.xda-developers.com/how-to-install-twrp/)"
                    ]
                }]
            },
            {
                "Category": "DualBoot",
                "Messages": [{
                        "question": "What's dualboot?",
                        "answers": [
                            "You can run multiple ROMs on your rooted Android phone with DualBootPatcher, and pick which one to use when you start it up.",
                            "[**Here you can find more informations**](https://forum.xda-developers.com/crossdevice-dev/android-one-crossdevice-development-original-android-development/dualboot-dualbootpatcher-simpler-dual-t3297414)",
                        ]
                    },
                    {
                        "question": "How do I use it?",
                        "answers": [
                            "_Go to the DualBootPatcher's xda thread_",
                            "Search for the 'How do I...?' section."
                        ]
                    }
                ]
            },
            {
                "Category": "Other",
                "Messages": [{
                    "question": "I found a bug, what should I do?",
                    "answers": [
                        "**Well, report it to a Developer.**",
                        "_You may be wondering now, Where and How you can do that?_",
                        "**The answer is simple:**",
                        "* In the Telegram group: [\(Here\)](https://t.me/joinchat/AAAAAEAcYGMW9RpRIW2-XQ)",
                        "* In the Discord group: [\(Here\)](https://discord.gg/VWZADHh)",
                        "* In the XDA-Thread: [\(Here\)](https://forum.xda-developers.com/redmi-note-2/orig-development/6-x-based-roms-nofearnohappy-kernel-t3494631)",
                        "_I'll just leave this image here.._",
                        "![GTFO](http://i.imgur.com/Ty8vE8G.png)"
                    ]
                }]
            }
        ]
    };
}
