/*jslint browser: true*/
/*global $, jQuery, alert*/
(function () {
    'use strict';
    $("body").tooltip({
        animation: false,
        selector: '[data-toggle="tooltip"]'
    });

    var markdown_it = window.markdownit({
        html: true,
        linkify: true,
        typographer: true
    });

    var page = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
    var githubReleasesLink = 'https://api.github.com/repos/TryHardDood/hermes-mirrors/releases';
    var releasesTags = [
        ["All", []],
        ["Dinolek", []],
        ["Bule", []],
        ["TWRP", []],
        ["Kernel", []]
    ];
    var faqData = [
        ["LineageOS 13",
            [
                ["Camera is crashing.",
                    [
                         "It's a known bug, you can't do much but wait for the developers to fix it.",
                         "_Note: You're camera is crashing because you have an **s5k3m2** camera or because of the **dpframework**_"
                    ]
                ],
                ["Audio quality is bad.",
                    [
                         "If you're using the second test version of Dinolek's rom, you'll need to flash the fix from the release.",
                         "[Click here](https://tryharddood.github.io/hermes-mirrors/index.html?releaseId=5863972)"
                    ]
                ],
                ["Battery is draining very fast.",
                    [
                         "**Here's what you can do:**",
                         "* _Clean install the rom._",
                         "* _Use the latest rom from Dinolek._",
                         "* _Remove all unnecessary apps._",
                         "* _Install Greenify, LSpeed or Redmi Note 2 Tool_"
                    ]
                ]
            ]
        ],
        ["Ressurrection Remix v5.8.2 - Port version",
            [
                ["Can't unlock the phone",
                     [
                         "This is a port bug.",
                         "**Here's what you can do:**",
                         "* Wait for an actual build from Dinolek",
                         "* Double tap the power button",
                         "* Call your phone and pick it up, then press the back button. Also install No Lock from Google Play.",
                         "* Revert back to Marshmellow"
                     ]
                ],
                ["Camera's focus and HDR not working",
                     [
                         "_You can't do much about it._",
                         "Will be fixed in the near future."
                     ]
                ],
                ["Camera not working",
                     [
                         "Flash the fix from the release: ",
                         "[Click here for the release](https://tryharddood.github.io/hermes-mirrors/index.html?releaseId=5897305)"
                     ]
                ],
                ["Does CM Theme engine works?",
                     [
                         "_For Nougat there's no CM Theme engine_",
                         "_It's uses Substratum_"
                     ]
                ]
            ]
        ],
        ["DualBoot",
            [
                ["What's dualboot?",
                     [
                         "You can run multiple ROMs on your rooted Android phone with DualBootPatcher, and pick which one to use when you start it up.",
                         "[**Here you can find more informations**](https://forum.xda-developers.com/crossdevice-dev/android-one-crossdevice-development-original-android-development/dualboot-dualbootpatcher-simpler-dual-t3297414)",
                     ]
                ],
                ["How do I use it?",
                     [
                         "_Go to the DualBootPatcher's xda thread_",
                         "Search for the 'How do I...?' section."
                     ]
                ]
            ]
        ],
        ["Other",
            [
                ["I found a bug, what should I do?",
                     [
                         "**Well, report it to a Developer.**",
                         "_You may be wondering now, Where and How you can do that?_",
                         "**The answer is simple:**",
                         "* In the Telegram group: [\(Here\)](https://t.me/joinchat/AAAAAEAcYGMW9RpRIW2-XQ)",
                         "* In the XDA-Thread: [\(Here\)](https://forum.xda-developers.com/redmi-note-2/orig-development/6-x-based-roms-nofearnohappy-kernel-t3494631)",
                         "_I'll just leave this image here.._",
                         "[![GTFO](http://i.imgur.com/Ty8vE8G.png)]"
                     ]
                ]
            ]
        ]
    ];
    var request = new XMLHttpRequest();
    request.onload = PrintReleases;
    request.open('get', githubReleasesLink, true);
    request.send();

    if (page === "faq.html") {
        for (var i = 0; i < faqData.length; i++) {
            PrintFaq(i);
        }
    } else {
        $('#releases').html(getLoading());

        for (var k = 0; k < releasesTags.length; k++)
            $('#tagsList').append('<a class="btn btn-outline-primary ' + (k === 0 ? 'active' : '') + '" href="?tab=' + k + '">' + releasesTags[k][0] + '</a>');

        $('#tagsList').click(function (event) {

            $('#tagsList .active').removeClass('active');
            var clicked = $(event.target);
            clicked.addClass('active');

            $('#releases').html(getLoading());
            history.pushState(null, null, clicked.attr('href'));
            var value = clicked.attr('href').replace("?tab=", "");

            $('#releases').html('');
            if (releasesTags[value][1].length === 0) {
                $('#releases').append('<div class="container"><div class="row"><div class="col-md-12"><div class="card card-outline-danger mb-3 text-center"><div class="card-block"><h3 class="card-title">No releases found.</h3><blockquote class="card-blockquote">Please check back later..</blockquote></div></div></div></div></div>');
            } else {
                for (var h = 0; h < releasesTags[value][1].length; h++) {
                    var release = releasesTags[value][1][h];
                    $('#releases').append(getHtmlForRelease(release.name, release.tag_name, release.id, release.prerelease, release.html_url, release.body, release.assets, true));
                }
            }

            event.preventDefault();
            event.stopPropagation();
        });
    }

    if (getParameterByName('releaseId') !== null) {

        var specReq = new XMLHttpRequest();
        specReq.onload = ProcessSpecVersionLink;
        specReq.open('get', githubReleasesLink + '/' + getParameterByName('releaseId'));
        specReq.send();

        $('#showVersionModalBody').html(getLoading());
        $('#showVersionModal').modal('show');
    }

    /**
     *
     * Functions
     *
     **/

    function PrintReleases() {
        var jsonObject = JSON.parse(this.responseText),
            jsonLenght = jsonObject.length;
        $('#releases').html('');
        if (jsonObject === 'undefined' || jsonObject.length < 1) {
            $('body').append('<div class="container"><div class="row"><div class="col-md-12"><div class="card card-outline-danger mb-3 text-center"><div class="card-block"><h3 class="card-title">No releases found.</h3><blockquote class="card-blockquote">Please check back later..</blockquote></div></div></div></div></div>');
        }

        for (var i = 0; i < jsonLenght; i++) {
            var release = jsonObject[i];

            if (release.tag_name.toLowerCase().indexOf("dinolek") !== -1)
                releasesTags[1][1].push(release);
            if (release.tag_name.toLowerCase().indexOf("bule") !== -1)
                releasesTags[2][1].push(release);
            if (release.tag_name.toLowerCase().indexOf("twrp") !== -1)
                releasesTags[3][1].push(release);
            if (release.tag_name.toLowerCase().indexOf("kernel") !== -1)
                releasesTags[4][1].push(release);

            releasesTags[0][1].push(release);

            $('#releases').append(getHtmlForRelease(release.name, release.tag_name, release.id, release.prerelease, release.html_url, release.body, release.assets, true));
        }

        if (getParameterByName('tab') !== null) {
            var par = getParameterByName('tab');
            $('#tagsList').find('a[href="?tab=' + par + '"]').trigger("click");
        }
    }

    function ProcessSpecVersionLink() {
        var jsonObject = JSON.parse(this.responseText);

        $('#showVersionModalBody').html(getHtmlForRelease(jsonObject.name, jsonObject.tag_name, jsonObject.id, jsonObject.prerelease, jsonObject.html_url, jsonObject.body, jsonObject.assets, false));
    }

    function getHtmlForRelease(name, tag_name, id, prerelease, html_url, body, assets) {
        var html;
        if (Object.keys(assets).length === 0) {
            html = '<div class="col-md-12 item">' +
                '<div class="card card-outline-' + (prerelease ? "warning" : "secondary") + '">' +
                '<div class="card-block">' +
                '<h4 class="card-title">' + ((name === null) ? tag_name : name) + '' +
                '<span class="text-muted" style="font-size: 12px; float: right">' +
                '<a href="index.html?releaseId=' + id + '" target="_blank">' +
                '<i class="fa fa-share-alt" aria-hidden="true"></i> Share' +
                '</a> | ' +
                '<a href="' + html_url + '" target="_blank">' +
                '<i class="fa fa-github" aria-hidden="true"></i> View on Github' +
                '</a>' +
                '</span>' +
                '</h4>' +
                '<h6 class="card-subtitle mb-2 text-muted">' +
                '<span class="badge badge-' + (prerelease ? "warning" : "success") + '">' + (prerelease ? "Pre-Release" : "Release") + '</span>' +
                '</h6>' +
                '<p class="card-text">' + ((body === null) ? "No changelog provided" : markdown_it.render(body)) + '</p>' +
                '</div>' +
                '<div class=card-block style="border-top:1px solid rgba(0,0,0,.125)">' +
                '<ul class="flex-column nav">';

            html += '<li class="nav-item">' +
                '<a class="btn btn-outline-' + (prerelease ? "warning" : "success") + ' nav-link" href="' + html_url + '" target="_blank">' +
                '<i aria-hidden=true class="fa fa-download"></i> Download ' + tag_name + '' +
                '</a>' +
                '</li>';

            html += '</ul></div>' +
                '</div>' +
                '</div>';
        } else {
            html = '<div class="col-md-12 item">' +
                '<div class="card card-outline-' + (prerelease ? "warning" : "secondary") + '">' +
                '<div class="card-block">' +
                '<h4 class="card-title">' + ((name === null) ? tag_name : name) + '' +
                '	<span class="text-muted" style="font-size: 12px; float: right">' +
                '		<a href="index.html?releaseId=' + id + '" target="_blank">' +
                '			<i class="fa fa-share" aria-hidden="true"></i> Share' +
                '		</a> | ' +
                '		<a href="' + html_url + '" target="_blank">' +
                '			<i class="fa fa-github" aria-hidden="true"></i> View on Github' +
                '		</a>' +
                '	</span>' +
                '</h4>' +
                '<h6 class="card-subtitle mb-2 text-muted">' +
                '	<span class="badge badge-' + (prerelease ? "warning" : "success") + '">' + (prerelease ? "Pre-Release" : "Release") + '</span>' +
                '</h6>' +
                '<p class="card-text">' + ((body === null) ? "No changelog provided" : markdown_it.render(body)) + '</p>' +
                '</div>' +
                '<div class=card-block style="border-top:1px solid rgba(0,0,0,.125)">' +
                '<ul class="flex-column nav">';

            for (var i = 0; i < assets.length; i++) {
                html += '<li class="nav-item" style="margin-bottom: 5px" data-toggle="tooltip" data-placement="top" data-html="true" title="Downloaded <strong>' + assets[i].download_count + '</strong> time' + ((assets[i].download_count > 1) ? 's' : '') + '">' +
                    '<a class="btn btn-outline-' + (prerelease ? "warning" : "success") + ' nav-link" href="' + assets[i].browser_download_url + '" target="_blank">' +
                    '<i aria-hidden=true class="fa fa-download"></i> Download ' + assets[i].name + '' +
                    '</a>' +
                    '</li>';
            }
        }
        return html;
    }

    function getLoading() {
        return ' <div class="col-md-12"> <div class="card card-outline-info mb-3 text-center"> <div class="card-block"> <h3 class="card-title">Loading...</h3> <blockquote class="card-blockquote"> <div class="progress"> <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"></div></div><footer>Please wait while we load the files.</footer> </blockquote> </div></div></div>';
    }

    function getParameterByName(name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) {
            return null;
        }
        if (!results[2]) {
            return '';
        }
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    function PrintFaq(id) {
        $('#faqBody').append('<h4 id="header">' + faqData[id][0] + '</h4>');

        for (var j = 0; j < faqData[id][1].length; j++) { // -> faqData[id][1][j][0] -> Question 
            var accordionItem = '<div class="accordion-section card card-outline-secondary">' +
                '<a class="accordion-section-title card-header" style="margin-bottom:0;" href="#accordion-' + (id + '-' + j) + '">' + faqData[id][1][j][0] + '</a>' +
                '<div id="accordion-' + (id + '-' + j) + '" class="accordion-section-content card-block">' +
                '<p>';

            for (var i = 0; i < faqData[id][1][j][1].length; i++) {
                accordionItem += markdown_it.render(faqData[id][1][j][1][i]);
            }

            accordionItem += '</p>' +
                '</div>' +
                '<!--end .accordion-section-content-->' +
                '</div>' +
                '<!--end .accordion-section-->';


            $('#faqBody').append(accordionItem);
        }
    }

    /**
     *
     *   Accordion
     *
     **/
    function close_accordion_section() {
        $('.accordion .accordion-section-title').removeClass('active');
        $('.accordion .accordion-section-content').slideUp(300).removeClass('open');
    }

    $('a.accordion-section-title').click(function (e) {
        var currentAttrValue = $(this).attr('href');

        if ($(e.target).is('.active')) {
            close_accordion_section();
        } else {
            close_accordion_section();
            $(this).addClass('active');
            $('.accordion ' + currentAttrValue).slideDown(300).addClass('open');
        }
        e.preventDefault();
    });
}());
