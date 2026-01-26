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

This course project focused on setting requirements for a knee prosthesis concept and designing it using CAD software. An emphasis was placed on designing for assembly, machinability, material selection, and simulation to verify requirements would be met. Some aspects that were not fully explored include fastener selection and friction.

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
| 3 | The length of the foot / blade shall be 12 inches | This value corresponds to the length of an average human foot | 
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

<style>
/* Base container */
.prosthesis-media { margin-top: 1rem; }
.prosthesis-caption { margin-top: 0.5rem; margin-bottom: 1.5rem; }

/* Image card (left) */
.prosthesis-media .media-card.image-card {
  width: 100%;
  max-width: 520px;   /* larger */
  margin: 0 auto;
}

.prosthesis-media .media-img img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 0.5rem;
}

/* Video card (right) */
.prosthesis-media .media-card.video-card {
  width: 100%;
  max-width: 360px;   /* 🔽 slightly smaller */
  margin: 0 auto;
}

/* Portrait video */
.prosthesis-media .video-wrap {
  width: 100%;
  aspect-ratio: 9 / 16;
  overflow: hidden;
  border-radius: 0.5rem;
}

.prosthesis-media .video-wrap video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>

<div class="prosthesis-media">
  <div class="row mt-4 g-4 align-items-start">

    <!-- Image -->
    <div class="col-12 col-lg-6 text-center">
      <div class="media-card image-card">
        {% include figure.liquid
          path="assets/img/prosthesis-labeled.jpg"
          class="media-img rounded z-depth-1"
          loading="eager"
        %}
      </div>
    </div>

    <!-- Video -->
    <div class="col-12 col-lg-6 text-center">
      <div class="media-card video-card rounded z-depth-1">
        <div class="video-wrap">
          <video autoplay loop muted playsinline preload="metadata">
            <source src="{{ 'assets/img/prosthesis-exploded.mp4' | relative_url }}" type="video/mp4">
          </video>
        </div>
      </div>
    </div>

  </div>

  <div class="caption text-center prosthesis-caption">
    Side view of the prosthetic leg with itemized labels (left) and an exploded view animation of the full assembly (right).
  </div>
</div>

The main components and their selected materials are:

| Item | Part | Material |
| ------ | ---- | -------- |
| 1 | Quadricep connector socket | PBT General Purpose |
| 2 | Knee jont | Aluminum 6061 Alloy |
| 3 | Piston | Ti-6Al-4V Solution treated and aged (SS) |
| 4 | Piston cylinder | Ti-6Al-4V Solution treated and aged (SS) |
| 5 | Calf frame | Nylon 101 |
| 6 | Leg height adjuster | Aluminum 6061 Alloy |
| 7 | Pylon | Ti-6Al-4V Solution treated and aged (SS) |
| 8 | Foot connector | Aluminum 6061 Alloy | 
| 9 | Foot sole | Zoltek Panex 33 |
| 10 | Ankle suspension | Commercially Pure CP-Ti UNS R50400 (SS) |
