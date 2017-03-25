/*jslint browser: true*/
/*global $, jQuery, alert*/

(function () {
    'use strict';
    $('#releases').html(getLoading());

    var githubReleasesLink = 'https://api.github.com/repos/TryHardDood/hermes-mirrors/releases';

    var releasesTags = [
        ["All", []],
        ["Dinolek", []],
        ["Bule", []],
        ["TWRP", []]
    ];

    for (var k = 0; k < releasesTags.length; k++)
        $('#tagsList').append('<li class="nav-item"><a class="nav-link ' + (k === 0 ? 'active' : '') + '" href="' + k + '">' + releasesTags[k][0] + '</a></li>');

    $('#tagsList').click(function (e) {

        $('#tagsList .active').removeClass('active');
        var clicked = $(e.target);
        clicked.addClass('active');

        $('#releases').html(getLoading());
        if (releasesTags[clicked.attr('href')][1].length === 0) {
            $('#releases').html('');
            $('#releases').append('<div class="container"><div class="row"><div class="col-md-12"><div class="card card-outline-danger mb-3 text-center"><div class="card-block"><h3 class="card-title">No releases found.</h3><blockquote class="card-blockquote">Please check back later..</blockquote></div></div></div></div></div>');
        } else {
            $('#releases').html('');
            for (var h = 0; h < releasesTags[clicked.attr('href')][1].length; h++) {
                var release = releasesTags[clicked.attr('href')][1][h];
                $('#releases').append(getHtmlForRelease(release.name, release.tag_name, release.id, release.prerelease, release.html_url, release.body, release.assets, true));
            }
        }

        e.preventDefault();
    });

    function PrintReleases() {
        var jsonObject = JSON.parse(this.responseText),
            jsonLenght = /*(jsonObject.length >= 5 ? 5 : */ jsonObject.length;
        if (jsonLenght === 5) {
            $('body').append('<div class="container"><div class="row"><div class="col-md-12"><div class="card card-outline-info mb-3 text-center"><div class="card-block"><h3 class="card-title">Want to see older releases?</h3><blockquote class="card-blockquote"><a href="https://github.com/TryHardDood/hermes-mirrors/releases" target="_blank"><i class="fa fa-arrow-down" aria-hidden="true"></i> Click here to view older mirrors.</a></blockquote></div></div></div></div></div>');
        }

        $('#releases').html('');
        if (jsonObject === 'undefined' || jsonObject.length < 1) {
            $('body').append('<div class="container"><div class="row"><div class="col-md-12"><div class="card card-outline-danger mb-3 text-center"><div class="card-block"><h3 class="card-title">No releases found.</h3><blockquote class="card-blockquote">Please check back later..</blockquote></div></div></div></div></div>');
        }

        for (var i = 0; i < jsonLenght; i++) {
            var release = jsonObject[i];

            if (release.tag_name.toLowerCase().indexOf("dinolek") !== -1)
                releasesTags[1][1].push(release);
            else if (release.tag_name.toLowerCase().indexOf("bule") !== -1)
                releasesTags[2][1].push(release);
            else if (release.tag_name.toLowerCase().indexOf("twrp") !== -1)
                releasesTags[3][1].push(release);

            releasesTags[0][1].push(release);

            $('#releases').append(getHtmlForRelease(release.name, release.tag_name, release.id, release.prerelease, release.html_url, release.body, release.assets, true));
        }

        if (getParameterByName('tab') !== null) {
            var par = getParameterByName('tab');
            $('#tagsList').find('a[href="' + par + '"]').trigger("click");
        }
    }
    var request = new XMLHttpRequest();
    request.onload = PrintReleases;
    request.open('get', githubReleasesLink, true);
    request.send();

    function ProcessSpecVersionLink() {
        var jsonObject = JSON.parse(this.responseText);
        $('#showVersionModalBody').append(getHtmlForRelease(jsonObject.name, jsonObject.tag_name, jsonObject.id, jsonObject.prerelease, jsonObject.html_url, jsonObject.body, jsonObject.assets, false));

        var assetsLenght = Object.keys(jsonObject.assets).length;
        if (assetsLenght === 0) {
            $('#downloadButton').append('<a class="btn btn-outline-' + (jsonObject.prerelease ? "warning" : "success") + '" href="' + jsonObject.html_url + '" target="_blank">Download ' + jsonObject.tag_name + '</a>');

        } else {
            for (var j = 0; j < assetsLenght; j++) {
                var asset = jsonObject.assets[j];
                $('#downloadButton').append('<a class="btn btn-outline-' + (jsonObject.prerelease ? "warning" : "success") + '" href="' + asset.browser_download_url + '" target="_blank"><i class="fa fa-download" aria-hidden="true"></i> Download ' + asset.name + '</a>');
            }
        }
    }

    if (getParameterByName('releaseId') !== null) {

        var specReq = new XMLHttpRequest();
        specReq.onload = ProcessSpecVersionLink;
        specReq.open('get', githubReleasesLink + '/' + getParameterByName('releaseId'));
        specReq.send();

        $('#showVersionModal').modal('show');
    }
}());

function getHtmlForRelease(name, tag_name, id, prerelease, html_url, body, assets, specifided) {
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
            '<p class="card-text">' + ((body === null) ? "No changelog provided" : body) + '</p>' +
            (specifided ? '<a class="card-link btn btn-outline-' + (prerelease ? "warning" : "success") + '" href="' + html_url + '" target="_blank">Download ' + tag_name + '</a>' : '') +
            '</div>' +
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
            '<p class="card-text">' + ((body === null) ? "No changelog provided" : body) + '</p>' +
            (specifided ? '<a class="card-link btn btn-outline-' + (prerelease ? "warning" : "success") + '" href="' + assets[0].browser_download_url + '" target="_blank"><i class="fa fa-download" aria-hidden="true"></i> Download ' + assets[0].name + '</a>' : '') +
            '</div>' +
            '</div>' +
            '</div>';
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
