<template>
  <div class="container">
    <Map 
      :centerCoordinate="centerCrood"
      :siteCoordinates="siteCroods"
      :areaCoordinates="areaCroods">
    </Map>
  </div>
</template>

<script>
import Map from '@/components/common/map'

export default {
  layout: 'blank',
  data() {
    return {
      centerCrood: { longitude: 135.84301266472, latitude: 34.685048009687 },
      siteCroods: [{"place":"春日大社","latitude":34.681381733025,"longitude":135.84838567026},{"place":"奈良公园","latitude":34.685048009687,"longitude":135.84301266472},{"place":"东大寺","latitude":34.688984260929,"longitude":135.83981502914},{"place":"冰室神社","latitude":34.684416074901,"longitude":135.83808275463},{"place":"依水园","latitude":34.685563981837,"longitude":135.83721072999},{"place":"奈良国立博物馆","latitude":34.683655602673,"longitude":135.83690411599},{"place":"兴福寺","latitude":34.682884496646,"longitude":135.83222664608}],
      areaCroods: [
        {
          name: '法隆寺·三乡町',
          longitude: 135.75359344482,
          latitude: 34.594215352958,
          croods: [
            { latitude: 34.624026530191, longitude: 135.75651168823 },
            { latitude: 34.617952135026, longitude: 135.83152770996 },
            { latitude: 34.6067203964, longitude: 135.83539009094 }, 
            { latitude: 34.586654893837, longitude: 135.83667755127 },
            { latitude: 34.564252112584, longitude: 135.73677062988 },
            { latitude: 34.563934048573, longitude: 135.70110797882 },
            { latitude: 34.561530858949, longitude: 135.68741798401 },
            { latitude: 34.569058265125, longitude: 135.67042350769 },
            { latitude: 34.612301135722, longitude: 135.66123962402 },
            { latitude: 34.619506092389, longitude: 135.67016601562 },
          ]
        },
        {
          name: 'JR奈良站',
          longitude: 135.82075595856,
          latitude: 34.680952356444,
          croods: [
            { latitude: 34.684326962247, longitude: 135.82359373569 },
            { latitude: 34.68256689089, longitude: 135.82377076149 } ,
            { latitude: 34.680983235813, longitude: 135.82381904125 },
            { latitude: 34.679494395967, longitude: 135.82407385111 },
            { latitude: 34.678504026933, longitude: 135.82407653332 },
            { latitude: 34.678486381053, longitude: 135.8230599761 } ,
            { latitude: 34.678531598615, longitude: 135.81987150013 },
            { latitude: 34.67674162602, longitude: 135.81940814853 } ,
            { latitude: 34.676920294154, longitude: 135.81850290298 },
            { latitude: 34.677339390733, longitude: 135.81651806831 },
            { latitude: 34.677679077984, longitude: 135.81479072571 },
            { latitude: 34.684410774235, longitude: 135.81521987915 },
            { latitude: 34.684419596545, longitude: 135.81746220589 },
            { latitude: 34.684622509407, longitude: 135.81884622574 },
            { latitude: 34.684565164518, longitude: 135.82012295723 },
            { latitude: 34.684287261802, longitude: 135.82153916359 },
          ]
        },
        {
          name: '近铁奈良站',
          longitude: 135.82661390305,
          latitude: 34.685769398845,
          croods: [
            { latitude: 34.684327513642, longitude: 135.82359440625 },
            { latitude: 34.686876573191, longitude: 135.82360446453 },
            { latitude: 34.687366195372, longitude: 135.82520842552 },
            { latitude: 34.687657320701, longitude: 135.82755804062 },
            { latitude: 34.687657320701, longitude: 135.82906007767 },
            { latitude: 34.687353513753, longitude: 135.8318965137 },
            { latitude: 34.684683989701, longitude: 135.8318978548  },
            { latitude: 34.684490726382, longitude: 135.83181269467 },
            { latitude: 34.684461502503, longitude: 135.83048164845 },
            { latitude: 34.684450474621, longitude: 135.82984596491 },
            { latitude: 34.684176982687, longitude: 135.82985401154 },
            { latitude: 34.683960835197, longitude: 135.82985401154 },
            { latitude: 34.683206520147, longitude: 135.82990095019 },
            { latitude: 34.682624237163, longitude: 135.82988888025 },
            { latitude: 34.681980192123, longitude: 135.82985401154 },
            { latitude: 34.682015482392, longitude: 135.82899838686 },
            { latitude: 34.681384666568, longitude: 135.82905471325 },
            { latitude: 34.680481444634, longitude: 135.82903057337 },
            { latitude: 34.679659823939, longitude: 135.82904666662 },
            { latitude: 34.678468873026, longitude: 135.82903392613 },
            { latitude: 34.678513125589, longitude: 135.82590311766 },
            { latitude: 34.678503337641, longitude: 135.82407720387 },
            { latitude: 34.679513695914, longitude: 135.8240711689 },
            { latitude: 34.680979651601, longitude: 135.82382004708 },
            { latitude: 34.682564823115, longitude: 135.82377159968 }
          ]
        },
        {
          name: '奈良公园',
          longitude: 135.83092689514,
          latitude: 34.682822743186,
          croods: [
            { latitude: 34.681979089302, longitude: 135.82985468209 },
            { latitude: 34.682014930982, longitude: 135.82899838686 },
            { latitude: 34.681381495934, longitude: 135.82905488089 },
            { latitude: 34.681094001671, longitude: 135.82904725336 },
            { latitude: 34.680821394704, longitude: 135.82903962582 },
            { latitude: 34.680541618379, longitude: 135.82903233357 },
            { latitude: 34.680470106048, longitude: 135.82903136965 },
            { latitude: 34.680239784225, longitude: 135.82903577015 },
            { latitude: 34.679659272513, longitude: 135.82904666662 },
            { latitude: 34.67846942446, longitude: 135.82903392613} ,
            { latitude: 34.678453019299, longitude: 135.83043202758 },
            { latitude: 34.678446677807, longitude: 135.83165109158 },
            { latitude: 34.67842462044, longitude: 135.83243429661 } ,
            { latitude: 34.678415797492, longitude: 135.83335161209 },
            { latitude: 34.677458502006, longitude: 135.83339452744 },
            { latitude: 34.677105579219, longitude: 135.83345890045 },
            { latitude: 34.676743831802, longitude: 135.83541154861 },
            { latitude: 34.676558545928, longitude: 135.83963871002 },
            { latitude: 34.675835044734, longitude: 135.84970235825 },
            { latitude: 34.675587994099, longitude: 135.85257768631 },
            { latitude: 34.683528538524, longitude: 135.85416555405 },
            { latitude: 34.690550874371, longitude: 135.85736274719 },
            { latitude: 34.694661663885, longitude: 135.85214853287 },
            { latitude: 34.698128329817, longitude: 135.84576487541 },
            { latitude: 34.698207717412, longitude: 135.83809375763 },
            { latitude: 34.694705769961, longitude: 135.83504676819 },
            { latitude: 34.692826830273, longitude: 135.83474636078 },
            { latitude: 34.691640341691, longitude: 135.83245575428 },
            { latitude: 34.69077362088, longitude: 135.83246648312} ,
            { latitude: 34.689320244241, longitude: 135.83247184753 },
            { latitude: 34.68933347692, longitude: 135.83190858364 } ,
            { latitude: 34.687101535093, longitude: 135.8318951726 } ,
            { latitude: 34.684684265397, longitude: 135.8318978548 } ,
            { latitude: 34.684489623594, longitude: 135.83181202412 },
            { latitude: 34.684479698504, longitude: 135.83133727312 },
            { latitude: 34.684467016443, longitude: 135.83076395094 },
            { latitude: 34.684463432382, longitude: 135.83060268313 },
            { latitude: 34.684460951109, longitude: 135.83047829568 },
            { latitude: 34.684449371833, longitude: 135.82984596491 },
            { latitude: 34.684167953578, longitude: 135.82985531073 },
            { latitude: 34.683955459072, longitude: 135.82985459827 },
            { latitude: 34.683848625754, longitude: 135.82986189052 },
            { latitude: 34.68320266033, longitude: 135.82990195602 } ,
            { latitude: 34.682637746616, longitude: 135.82988971844 },
          ]
        },
        {
          name: '奈良町',
          longitude: 135.8230304718,
          latitude: 34.676329143794,
          croods: [
            { latitude: 34.678531598615, longitude: 135.81987082958 },
            { latitude: 34.676741074575, longitude: 135.81940881908 },
            { latitude: 34.670435055727, longitude: 135.82803010941 },
            { latitude: 34.670082103012, longitude: 135.83480000496 },
            { latitude: 34.67332038777, longitude: 135.83463907242 } ,
            { latitude: 34.673790237371, longitude: 135.83462029696 },
            { latitude: 34.673801266673, longitude: 135.83482682705 },
            { latitude: 34.674282142783, longitude: 135.83487510681 },
            { latitude: 34.676843643366, longitude: 135.83487443626 },
            { latitude: 34.677105579219, longitude: 135.8334582299 } ,
            { latitude: 34.677461259209, longitude: 135.83339318633 },
            { latitude: 34.678415797492, longitude: 135.83335094154 },
            { latitude: 34.678425034016, longitude: 135.83242340013 },
            { latitude: 34.678445850656, longitude: 135.83165880293 },
            { latitude: 34.678452054289, longitude: 135.83047242835 },
            { latitude: 34.678469286602, longitude: 135.82902990282 },
            { latitude: 34.678489413939, longitude: 135.82757849246 },
            { latitude: 34.67851395274, longitude: 135.82591786981 } ,
            { latitude: 34.67850781804, longitude: 135.82497088239 } ,
            { latitude: 34.678503889075, longitude: 135.82407753915 },
            { latitude: 34.678485553902, longitude: 135.82305796444 },
          ]
        }
      ]
    }
  },
  components: {
    Map
  }
}
</script>

<style lang="less">
.container {
  height: 500px;
  width: 1000px;
}
</style>