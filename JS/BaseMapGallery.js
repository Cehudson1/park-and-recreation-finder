﻿//function for adding the basemap layers
function CreateBaseMapComponent() {
    if (baseMapLayerCollection.length != 0) {
        for (var i = 0; i < baseMapLayerCollection.length; i++) {
            map.addLayer(CreateBaseMapLayer(baseMapLayerCollection[i].MapURL, baseMapLayerCollection[i].Key, (i == 0) ? true : false));
        }

        if (baseMapLayerCollection.length == 1) {
            dojo.byId('divBaseMapTitleContainer').style.display = 'none';
            HideLoadingMessage();
            return;
        }

        var layerList = dojo.byId('layerList');

        for (var i = 0; i < Math.ceil(baseMapLayerCollection.length / 2); i++) {
            var previewDataRow = document.createElement("tr");

            if (baseMapLayerCollection[(i * 2) + 0]) {
                var layerInfo = baseMapLayerCollection[(i * 2) + 0];
                layerList.appendChild(CreateBaseMapElement(layerInfo));
            }

            if (baseMapLayerCollection[(i * 2) + 1]) {
                var layerInfo = baseMapLayerCollection[(i * 2) + 1];
                layerList.appendChild(CreateBaseMapElement(layerInfo));
            }
        }
        if (dojo.isIE != 7) {
            dojo.addClass(dojo.byId("imgThumbNail" + baseMapLayerCollection[0].Key), "selectedBaseMap");
        }
        if (dojo.isIE == 8) {
            dojo.byId("imgThumbNail" + baseMapLayerCollection[0].Key).style.marginTop = "-5px";
            dojo.byId("imgThumbNail" + baseMapLayerCollection[0].Key).style.marginLeft = "-5px";
            dojo.byId("spanBaseMapText" + baseMapLayerCollection[0].Key).style.marginTop = "8px";
        }
    }  
}

//function for changing the map onclick
function CreateBaseMapElement(baseMapLayerInfo) {
    var divContainer = document.createElement("div");
    divContainer.className = "baseMapContainerNode";
    var imgThumbnail = document.createElement("img");
    imgThumbnail.src = baseMapLayerInfo.ThumbnailSource;
    imgThumbnail.className = "basemapThumbnail";
    imgThumbnail.id = "imgThumbNail" + baseMapLayerInfo.Key;
    imgThumbnail.setAttribute("layerId", baseMapLayerInfo.Key);
    imgThumbnail.onclick = function () {
        ChangeBaseMap(this);
    };
    var spanBaseMapText = document.createElement("span");
    var spanBreak = document.createElement("br");
    spanBaseMapText.id = "spanBaseMapText" + baseMapLayerInfo.Key;
    spanBaseMapText.className = "basemapLabel";
    spanBaseMapText.innerHTML = baseMapLayerInfo.Name;
    divContainer.appendChild(imgThumbnail);
    divContainer.appendChild(spanBreak);
    divContainer.appendChild(spanBaseMapText);
    return divContainer;
}

//function for showing the present map and hiding previous map on window
function ChangeBaseMap(spanControl) {
    dijit.byId('imgBaseMap').attr("checked", false);
    HideMapLayers();
    var key = spanControl.getAttribute('layerId');
    for (var i = 0; i < baseMapLayerCollection.length; i++) {
        dojo.removeClass(dojo.byId("imgThumbNail" + baseMapLayerCollection[i].Key), "selectedBaseMap");
        dojo.byId("imgThumbNail" + baseMapLayerCollection[i].Key).style.marginTop = "0px";
        dojo.byId("imgThumbNail" + baseMapLayerCollection[i].Key).style.marginLeft = "0px";
        dojo.byId("spanBaseMapText" + baseMapLayerCollection[i].Key).style.marginTop = "1px";
        if (baseMapLayerCollection[i].Key == key) {
            if (dojo.isIE != 7) {
                dojo.addClass(dojo.byId("imgThumbNail" + baseMapLayerCollection[i].Key), "selectedBaseMap");
            }
            if (dojo.isIE == 8) {
                dojo.byId("imgThumbNail" + baseMapLayerCollection[i].Key).style.marginTop = "-5px";
                dojo.byId("imgThumbNail" + baseMapLayerCollection[i].Key).style.marginLeft = "-5px";
                dojo.byId("spanBaseMapText" + baseMapLayerCollection[i].Key).style.marginTop = "8px";
            }
            var layer = map.getLayer(baseMapLayerCollection[i].Key);
            ShowHideBaseMapComponent();
            layer.show();
        }
    }
}

//function for displaying a map on window
function CreateBaseMapLayer(layerURL, layerId, isVisible) {
    var layer = new esri.layers.ArcGISTiledMapServiceLayer(layerURL, { id: layerId, visible: isVisible });
    return layer;
}

//function for hiding a map on window
function HideMapLayers() {
    for (var i = 0; i < baseMapLayerCollection.length; i++) {
        var layer = map.getLayer(baseMapLayerCollection[i].Key);
        if (layer) {
            layer.hide();
        }
    }
}

//function for showing and hiding of basemap container
function ShowHideBaseMapComponent() {
    if (dojo.byId('divAddressContainer').children.length != 0) {
        if (dojo.coords(dojo.byId('divAddressContainer')).h > 0) {
            WipeOutControl(dojo.byId('divAddressContainer'), 500);
        }
        setTimeout(function () { RemoveChildren(dojo.byId('divAddressContainer')); }, 500);
    }
    else {
        dojo.byId('divAddressContainer').style.display = 'none';
    }
    var node = dojo.byId('divBaseMapTitleContainer');
    var appNode = dojo.byId('divAppContainer');
    if (dojo.coords(appNode).h > 0) {
        dijit.byId('imgapplink').attr("checked", false);
        WipeOutControl(appNode, 500);
    }

    if (dojo.coords(node).h > 0) {
        WipeOutControl(node, 500);
    }
    else {
        WipeInControl(node, 500);
    }
}
