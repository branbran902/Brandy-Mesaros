<template>
  <div class="header">
      <div class=" container-fluid">

        <div id="intro" class="row col align-self-center">
          <div class="row">
            <div class="col-lg-2 text-center">
              <b-img
                id="profile"
                alt="Brandy Mesaros"
                :src="require('../assets/Brandy.jpeg')"
                fluid
              >
              </b-img>
            </div>

            <div class="col-md-10">
              <p>Hi, I'm</p>
              <span id="first">BRANDY</span> <span id="last">MESAROS</span>
            </div>
          </div>
        </div>

      </div>
    </div>
</template>

<script>
// import { SVG } from "@svgdotjs/svg.js";

export default {
  name: "Header",
  data() {
    return {
      profilePic: require("../assets/1.svg"),
    };
  },
  methods: {
    printLeaves() {
      // var drawLeft = SVG().addTo("#leftLeaves").size(400, 1800);

      // for (var i = 1; i < 50; i++) {
      //   //RANDOM NUMBER
      //  var imgNum = this.randomNumber(17);
      //   var num = this.randomNumber(4);

      //   //SET HEIGHT AND WIDTH
      //   var height = num * 100;
      //   var width = num * 100;

      //   var leftImg = drawLeft.image(require("../assets/" + imgNum + ".svg"));
      //   leftImg.size(height, width);
      //   leftImg.move(-25, i * 100)
      //   leftImg.animate({ swing: true,});

      //   leftImg.transform({
      //     translate: [0, 0],
      //     flip: "x",
      //   });

        // var drawTop = SVG().addTo("#topLeaves").size(200, 200);
        // var topImg = drawTop.image(require("../assets/" + i + ".svg"));
        // topImg.size(200, 200);

        // topImg.transform({
        //   translate: [0, 0],
        //   flip: "y",
        // });
       }
    // },
    // randomNumber(max) {
    //   return Math.floor(Math.random() * max) + 1;
    // },
  },
  mounted() {
    this.printLeaves();
  },
};
</script>

