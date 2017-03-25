/*jslint browser: true*/
/*global $, jQuery, alert*/

(function () {
    'use strict';

    function PrintReleases() {
        var jsonObject = JSON.parse(this.responseText),
            jsonLenght = (jsonObject.length >= 5 ? 5 : jsonObject.length);
        if (jsonLenght === 5) {
            $('body').append('<div class="container"><div class="row"><div class="col-md-12"><div class="card card-outline-info mb-3 text-center"><div class="card-block"><h3 class="card-title">Want to see older releases?</h3><blockquote class="card-blockquote"><a href="https://github.com/TryHardDood/hermes-mirrors/releases" target="_blank"><i class="fa fa-arrow-down" aria-hidden="true"></i> Click here to view older mirrors.</a></blockquote></div></div></div></div></div>');
        }
        $('#releases').html('');

        if (jsonObject === 'undefined' || jsonObject.length < 1) {
            $('body').append('<div class="container"><div class="row"><div class="col-md-12"><div class="card card-outline-danger mb-3 text-center"><div class="card-block"><h3 class="card-title">No releases found.</h3><blockquote class="card-blockquote">Please check back later..</blockquote></div></div></div></div></div>');
        }
        for (var i = 0; i < jsonLenght; i++) {
            var release = jsonObject[i];
            var assetsLenght = Object.keys(release.assets).length;
            if (assetsLenght === 0) {
                $('#releases').append('<div class="col-md-12" id="item"><div class="card card-outline-' + (release.prerelease ? "warning" : "secondary") + '"><div class="card-block"><h4 class="card-title">' + ((release.name === null) ? release.tag_name : release.name) + '<span class="text-muted" style="font-size: 12px; float: right"><a href="index.html?releaseId=' + release.id + '" target="_blank"><i class="fa fa-share" aria-hidden="true"></i> Share</a> | <a href="' + release.html_url + '" target="_blank"><i class="fa fa-github" aria-hidden="true"></i> View on Github</a></span></h4><h6 class="card-subtitle mb-2 text-muted"><span class="badge badge-' + (release.prerelease ? "warning" : "success") + '">' + (release.prerelease ? "Pre-Release" : "Release") + '</span></h6><p class="card-text">' + ((release.body === null) ? "No changelog provided" : release.body) + '</p><a class="card-link btn btn-outline-' + (release.prerelease ? "warning" : "success") + '" href="' + release.html_url + '" target="_blank">Download ' + release.tag_name + '</a></div></div></div><br/>');
            } else {
                for (var j = 0; j < assetsLenght; j++) {
                    var asset = release.assets[j];
                    $('#releases').append('<div class="col-md-12" id="item"><div class="card card-outline-' + (release.prerelease ? "warning" : "secondary") + '"><div class="card-block"><h4 class="card-title">' + ((release.name === null) ? release.tag_name : release.name) + '<span class="text-muted" style="font-size: 12px; float: right"><a href="index.html?releaseId=' + release.id + '" target="_blank"><i class="fa fa-share" aria-hidden="true"></i> Share</a> | <a href="' + release.html_url + '" target="_blank"><i class="fa fa-github" aria-hidden="true"></i> View on Github</a></span></h4><h6 class="card-subtitle mb-2 text-muted"><span class="badge badge-' + (release.prerelease ? "warning" : "success") + '">' + (release.prerelease ? "Pre-Release" : "Release") + '</span></h6><p class="card-text">' + ((release.body === null) ? "No changelog provided" : release.body) + '</p><a class="card-link btn btn-outline-' + (release.prerelease ? "warning" : "success") + '" href="' + asset.browser_download_url + '" target="_blank"><i class="fa fa-download" aria-hidden="true"></i> Download ' + asset.name + '</a></div></div></div><br/>');

                }
            }
        }
    }
    var request = new XMLHttpRequest();
    request.onload = PrintReleases;
    request.open('get', 'https://api.github.com/repos/TryHardDood/hermes-mirrors/releases', true);
    request.send();

    function ProcessSpecVersionLink() {
        var jsonObject = JSON.parse(this.responseText);
        var assetsLenght = Object.keys(jsonObject.assets).length;
        if (assetsLenght === 0) {
            $('#showVersionModalBody').append('<div class="card card-outline-' + (jsonObject.prerelease ? "warning" : "secondary") + '"><div class="card-block"><h4 class="card-title">' + ((jsonObject.name === null) ? jsonObject.tag_name : jsonObject.name) + '<span class="text-muted" style="font-size: 12px; float: right"><a href="index.html?releaseId=' + jsonObject.id + '" target="_blank"><i class="fa fa-share-alt" aria-hidden="true"></i> Share</a> | <a href="' + jsonObject.html_url + '" target="_blank"><i class="fa fa-github" aria-hidden="true"></i> View on Github</a></span></h4><h6 class="card-subtitle mb-2 text-muted"><span class="badge badge-' + (jsonObject.prerelease ? "warning" : "success") + '">' + (jsonObject.prerelease ? "Pre-Release" : "Release") + '</span></h6><p class="card-text">' + ((jsonObject.body === null) ? "No changelog provided" : jsonObject.body) + '</p></div></div>');

            $('#downloadButton').append('<a class="btn btn-outline-' + (jsonObject.prerelease ? "warning" : "success") + '" href="' + jsonObject.html_url + '" target="_blank">Download ' + jsonObject.tag_name + '</a>');

        } else {
            for (var j = 0; j < assetsLenght; j++) {
                var asset = jsonObject.assets[j];
                $('#showVersionModalBody').append('<div class="card card-outline-' + (jsonObject.prerelease ? "warning" : "secondary") + '"><div class="card-block"><h4 class="card-title">' + ((jsonObject.name === null) ? jsonObject.tag_name : jsonObject.name) + '<span class="text-muted" style="font-size: 12px; float: right"><a href="index.html?releaseId=' + jsonObject.id + '" target="_blank"><i class="fa fa-share" aria-hidden="true"></i> Share</a> | <a href="' + jsonObject.html_url + '" target="_blank"><i class="fa fa-github" aria-hidden="true"></i> View on Github</a></span></h4><h6 class="card-subtitle mb-2 text-muted"><span class="badge badge-' + (jsonObject.prerelease ? "warning" : "success") + '">' + (jsonObject.prerelease ? "Pre-Release" : "Release") + '</span></h6><p class="card-text">' + ((jsonObject.body === null) ? "No changelog provided" : jsonObject.body) + '</p></div></div>');

                $('#downloadButton').append('<a class="btn btn-outline-' + (jsonObject.prerelease ? "warning" : "success") + '" href="' + asset.browser_download_url + '" target="_blank"><i class="fa fa-download" aria-hidden="true"></i> Download ' + asset.name + '</a>');
            }
        }
    }

    if (getParameterByName('releaseId') !== null) {

        var specReq = new XMLHttpRequest();
        specReq.onload = ProcessSpecVersionLink;
        specReq.open('get', 'https://api.github.com/repos/TryHardDood/hermes-mirrors/releases/' + getParameterByName('releaseId'));
        specReq.send();

        $('#showVersionModal').modal('show');
    }
}());

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
