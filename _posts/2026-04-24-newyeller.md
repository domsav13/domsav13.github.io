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

### Methods and Results

The system overview for the quadruped robot is given in Fig. 1.

fig

First, an orthogonal calibration routine was used to establish the servo-motor ranges of motion for each joint. Once the desirable states were observed, the positions are saved to the microcontroller.

fig

The robot comes with several built-in functions, including a microphone for voice commands and a Bluetooth-based joystick. Using the [OpenCatESP32 framework](https://github.com/PetoiCamp/OpenCatEsp32-Quadruped-Robot), an object detection system was developed on the microcontroller. First, a gesture model was uploaded onto the AI vision camera module to detect "rock", "paper", and "scissors." The data that was returned and later used include bounding box coordinates, classifier ID, and confidence scores for each measurement. 

fig

The camera code that was developed uses this data to filter measurements and to then play the winning gestures, which are shown in Fig. 3. The camera tasks polls for two conditions:

1. **__Uncentered, low confidence__**: if the gesture is uncentered in the image and contains a low detection score, the robot repositions itself to align the detection.

2. **__Centered, high confidence__**: if the gesture is within the center of the image with a high detection score (>70), the robot executes the winning move.

A low-pass filter is also applied to the bounding box detection and confidence scores to reduce false positive detection cases. 

### Results

X

### Further Work

This work can be expanded in several ways. First, gesture recognition can be improved by training with more hand shapes, lighting conditions, backgrounds, and distances/depth for better reliability. Speech feedback can also be added to enhance human-robot interaction. Lastly, autonomy can be added such that the robot scans an environment, locates a human player, approaches to an appropriate distance, and begins the game without manual setup.
