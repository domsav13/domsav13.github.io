---
layout: post
title: A Robot Dog for Rock-Paper-Scissors
date: 2026-04-24 11:12:00-0400
description: Image filtering and gesture classification for the Petoi Bittle X quadruped
tags: 
categories: 
thumbnail: assets/img/newyeller.jpg
related_posts: false
---

### Background and Introduction

Low-cost robotic platforms have been proven to support engaging interaction through sensing and control, with human-robot interactions benefitting from natural language modalitiess such as gesture. Recent AI vision algorithms also are extremely powerful at enhancing object detection capability.

The objective of this project is for the robot to successfully play and win a series of rock-paper-scissors games based on a gesture input. The robot will search for and confirm the sight of a hand gesture, and will respond with the winning action when the gesture (rock, paper, or scissors) is detected with high confidence. 

---

### Methods and Results

The system overview for the quadruped robot is given in Fig. 1. The quadruped features a custom microcontroller using an ESP32 processor. Nine servo-motors are used (2 for each leg, plus one for the rotation of the head), and sensor ports are located on the main board. The electronics are powered by a battery pack attached below the microcontroller. In this project, the sensor that is used is a low-resolution PiCamera which uses another processor to perform computer vision. The relevant data is computed at the edge and then distributed to the main controller through an I2C communication protocol.

<div class="row mt-3">
    <div class="col-12 col-md-8 mx-auto mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/dog_overview.jpg" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Fig. 1: Main components of the quadruped
</div>

First, an orthogonal calibration routine was used to establish the servo-motor ranges of motion for each joint. Once the desirable states were observed, the positions are saved to the microcontroller.

<div class="row mt-3">
    <div class="col-12 col-md-6 mx-auto mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/dog_calibration.jpg" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Fig. 2: The calibration for the joints were done by homing to orthogonal leg positions
</div>

The robot comes with several built-in functions, including a microphone for voice commands and a Bluetooth-based joystick. Using the [OpenCatESP32 framework](https://github.com/PetoiCamp/OpenCatEsp32-Quadruped-Robot), an object detection system was developed on the microcontroller. First, a gesture model was uploaded onto the AI vision camera module to detect "rock", "paper", and "scissors." The data that was returned and later used include bounding box coordinates, classifier ID, and confidence scores for each measurement. 

<div class="row mt-3">
    <div class="col-12 col-md-8 mx-auto mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/dog_detection_model.jpg" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Fig. 3: Camera preview with the uploaded detection model along with logger data for the captured images
</div>

The camera code that was developed uses this data to filter measurements and to then play the winning gestures, which are shown in Fig. 3. The camera tasks polls for two conditions:

1. **_Uncentered, low confidence_**: if the gesture is uncentered in the image and contains a low detection score, the robot repositions itself to align the detection.

2. **_Centered, high confidence_**: if the gesture is within the center of the image with a high detection score (>70), the robot executes the winning move.

A low-pass filter is also applied to the bounding box detection and confidence scores to reduce false positive detection cases. 

---

### Results

Assuming the gesture is within the field of view with high confidence, the quadruped will execute the winning move. To beat scissors, the quadruped plays rock by showing its hand. To beat rock, the quadruped makes its body flat to resemble paper. To beat paper, the rock swipes its head back and forth to represent scissors. Because of filtering processes, the robot requires 3 seconds of high confidence in the gesture it detects before performing the win condition. 

<div class="row mt-3">
    <div class="col-12 col-md-7 mx-auto mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/dog_winning_moves.jpg" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Fig. 4: The winning actions for each rock-paper-scissors victory
</div>

<div class="row mt-3 justify-content-center">
  <div class="col-12 col-md-8 col-lg-6">
    <video
      autoplay
      loop
      muted
      playsinline
      preload="metadata"
      class="img-fluid rounded z-depth-1 w-100">
      <source src="{{ '/assets/img/dog_demo.mp4' | relative_url }}" type="video/mp4">
    </video>
  </div>
</div>

<div class="caption" style="text-align:center; margin-top:8px;">
  Demonstration of the quadruped playing rock to beat scissors.
</div>

---

### Further Work

This work can be expanded in several ways. First, gesture recognition can be improved by training with more hand shapes, lighting conditions, backgrounds, and distances/depth for better reliability. Speech feedback can also be added to enhance human-robot interaction. Lastly, autonomy can be added such that the robot scans an environment, locates a human player, approaches to an appropriate distance, and begins the game without manual setup.
