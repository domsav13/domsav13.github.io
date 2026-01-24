---
layout: post
title: Prosthetic Leg
date: 2025-12-08 11:12:00-0400
description: Requirement analysis and design of a knee prosthesis concept
tags: 
categories: 
thumbnail: assets/img/prosthesis.jpg
related_posts: false
---

This course project focused on setting requirements for a knee prosthesis concept. An emphasis was placed on designing for assembly, machinability, material selection, and simulation to verify requirements would be met. Some aspects that were not fully explored include fastener selection and friction.

---

### Objectives and Requirements

The objectives of the prosthetic leg are:
- The client will be able to walk and jog freely with normal range of motion in the knee joint
- The prosthetic will have similar functionality to a human leg (bio-inspired) with less complexity
- The prosthetic will be comfortable to wear and easy to put on
- It will be easy to learn, use, and assembly the prosthetic for the client's wants and needs

The overarching objectives were discretized into traceable requirements supported by rationale:

---

| No. | Requirement | Rationale |
| --- | ----------- | --------- |
| 1 | The prosthetic shall withstand up to 200 lbs of force | The device can endure up to the total body weight of the client | 
| 2 | The total height of the prosthetic leg shall be 36 inches | The typical length of a leg is approximately 36 inches | 
| 2.1 | The maximum thickness of the foot / blade shall be 2 inches | This value corresponds to the thickness of an average shoe | 
| 2.2 | The length of the lower leg shall be 26 inches | This value corresponds to the length of an average human lower leg (ankle to knee) | 
| 2.3 | The length of the upper leg shall be 8 inches | This value is chosen to accommodate the length from the missing knee joint to the residual limb in the quadricep area | 
| 3 | The length of the foot / blade shall be 12 inchse | This value corresponds to the length of an average human foot | 
| 4 | The knee joint shall move with one degree of freedom like a typical hinge | This simplifies the degrees of freedom that an actual human knee has while providing enough functionality | 
| 4.1 | The range of motion of the knee joint shall be 0 to 125 degrees | This allows enough bending for simple motions like walking and sitting | 
| 5 | The ankle joint shall move with one degree of freedom | This simplifies the degrees of freedom that an actual human ankle has while providing functionality for walking and other motions | 
| 5.1 | The ankle joint shall rotate along the same plane the knee joint rotates about | This is necessary for the prosthetic to generate force for walking and remaining stable | 
| 5.2 | Maximum dorsiflexion range of motion shall be 20 degrees above horizontal | This is approximately how much the foot is able to raise from a resting position and is necessary for proper walking biomechanics | 
| 5.3 | Maximum plantar flexion range of motion shall be 40 degrees below horizontal | This is approximately how much a foot is able to lower from a resting position and is necessary for proper walking biomechanics | 
| 6 | The prosthetic shall attach securely to the residual limb | This is necessary for the prosthetic to function with the existing user's body | 
| 7 | The foot shall not slip on surfaces a would not, and shall have enough friction to support walking forces | This is required to optimize and support walking |
| 8 | The total weight of the prosthetic leg shall not exceed 34 lbs | This value was estimated using data showing how body parts typically weigh in relation to total body weight | 
| 9 | The prosthetic shall be able to withstand temperatures ranging from -10 C to 40 C | These values reflect expected seasonal temperatures |
| 10 | The prosthetic shall be able to endure 1-2 million cycles per year (representative of axial and cyclic bending fatigue) | This value is estimated as a fatigue limit that is reflective of normal daily walking for the duration of a year | 

---

### Design and Assembly

The final design uses a blade concept for the foot, an adjuster for height, and a piston concept for the knee joint. Fasteners and bearings are not included. 

<div class="row mt-4 align-items-center">

  <!-- Image -->
  <div class="col-12 col-md-6 text-center">
    {% include figure.liquid
      path="assets/img/prosthesis-labeled.jpg"
      class="img-fluid rounded z-depth-1"
      style="max-width: 100%; height: auto;"
      loading="eager"
    %}
  </div>

  <!-- Video -->
  <div class="col-12 col-md-6 text-center">
    <div class="video-portrait">
      <video
        autoplay
        loop
        muted
        playsinline
        preload="metadata">
        <source src="{{ 'assets/prosthesis-exploded.mp4' | relative_url }}" type="video/mp4">
      </video>
    </div>
  </div>

</div>

<div class="caption text-center mt-2">
  X
</div>

The main manufacturable components are:
| Number | Part | Material |
| --- | --- | --- |
| 1 | 


