---
layout: post
title: Deformation of a wing
date: 2023-12-01 11:12:00-0400
description: Stress analysis of an airplane wing
tags: 
categories: 
related_posts: false
---

Consider a cross-section of an airplane wing, approximated as a cantilever beam with length 1000 mm. The wing is made of Aluminum 6061 (elastic modulus $$ E = 70 $$ GPa, Poisson's ratio $$ \nu = 0.3 $$, and yield stress $$ \sigma_y = 250 $$ MPa) and experiences a downward force $$ P $$ applied at the shear center due to a turbojet engine.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/wing.jpg" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The cross-section of an Aluminum wing with a narrow cut and shear flows, with dimensions in millimeters.
</div>

---

### Shear flows and shear center

First, the shear center of the cross-section will be calculated analytically. The shear flow definition $$ q(s) = \frac{-S_y}{I_{xx}} \int_0^s ty ds $$ (N/mm) is used where $$ t $$ is the section thickness (mm), $$ S_y $$ is a placeholder force located on the shear center (N), $$ I_{xx} $$ is the second moment of area of the section about the x-axis ($$ mm^4 $$), and $$ s $$ is the path of the shear flow. With $$ r = 25 $$ mm and $$ t = 2 $$ mm, $$ I_{xx} $$ is calculated as:

$$
\begin{aligned}
I_{xx}
&= \frac{(2r)^3 t}{12}
+ 2\left(\frac{8 r t^3}{12} + 8 r^3 t\right)
+ 2 \int_{0}^{\pi/2} t r^2 \cos^2\theta \, r d\theta \\[4pt]
&= \frac{2}{3}r^3 t + 16 r^3 t
+ 2 r^3 t \int_{0}^{\pi/2} \cos^2\theta \, d\theta \\[4pt]
&= r^3 t\left(\frac{2}{3}+16+\frac{\pi}{2}\right)=18.24r^3t
\end{aligned}
$$

with the thin-wall approximation ($t^i = 0$ for $i \ge 2$). Now the shear flow is calculated for each major part of the section. 

In wall 12, $y = s_1$:

$$
q_{12}(s_1) = \frac{-S_y}{I_{xx}} \int_{0}^{s_1} t s_1 \, ds_1 = \frac{-S_y t}{2 I_{xx}} s_1^2
$$

with $$ q_2(s_1=r) = \frac{-S_y t}{2 I_{xx}} r^2 $$ at the boundary. 

In wall 23, $$ y = r $$:

$$
\begin{aligned}
q_{23}(s_2)
&= \frac{-S_y}{I_{xx}} \int_{0}^{s_2} t r \, ds_2 + q_2 \\[4pt]
&= \frac{-S_y}{I_{xx}} t r s_2 - \frac{S_y}{2 I_{xx}} t r^2 = \frac{-S_y}{I_{xx}} t \left(rs_2 + \frac{r^2}{2}\right)
\end{aligned}
$$

with $$ q_3(s_2=8_r) = \frac{-S_y}{I_{xx}} t \left(8r^2 + \frac{r^2}{2}\right) = \frac{-17S_y t r^2}{2 I_{xx}} $$ at the boundary. 

In wall 34, $$ y = r \cos\theta $$:

$$
\begin{aligned}
q_{34}(\theta)
&= \frac{-S_y}{I_{xx}} \int_{0}^{\theta} t r \cos\theta r d\theta + q_3 \\[4pt]
&= \frac{-S_y}{I_{xx}} t r^2 \int_{0}^{\theta} \cos\theta d\theta - \frac{17S_y}{2 I_{xx}}tr^2 \\[4pt]
&= \frac{-S_y}{I_{xx}} tr^2 \left(\sin\theta + \frac{17}{2}\right)
\end{aligned}
$$

Next, a sum of moments is used at the origin of the semi-circle to solve for the distance to shear center $$ x_s $$ using the calculated shear flows and the placeholder force $$ S_y $$. The shear flows $$ q_{12} $$, $$ q_{23} $$, and $$ q_{34} $$ all have symmetry in the section:

$$
\begin{aligned}
M_o
&= 0 \\
S_yx_s &= -2 \left( \int_{0}^{r} q_{12} 8r ds + \int_{0}^{8r} q_{23} r ds + \int_{0}^{\pi/2} q_{34} r^2 d\theta \right) \\[4pt]
S_yx_s &= -2 \left(\frac{-4S_y}{3I_{xx}}tr^4 - \frac{28S_y}{I_{xx}}tr^4 - \frac{14.35S_y}{I_{xx}}tr^4 \right) \\[4pt]
S_yx_s &= \frac{87.37S_y}{I_{xx}}tr^4
\end{aligned}
$$

Thus, the distance of the shear enter from the origin of the semi-circle is:

$$
x_s = \frac{87.37}{18.24(25)^3(2)} (2)(25)^4 = 119.75 mm
$$

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/shear_center.jpg" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The 3D model of the wing with the downward force applied at the shear center.
</div>

---

### Lowest allowable force (X-Y Plane)

With a maximum allowable yield stress of 250 MPa, the maximum Von Mises stress is determined with a safety factor of 2:

$$
\sigma_v = \frac{\sigma_y}{N} = \frac{250}{2} = 125 MPa
$$

By breaking this Von Mises stress into shear and bending stresses throughout the section, the lowest allowable value for the force $$ P $$ can be determined. In the X-Y plane, the Von Mises stress consists of:

$$
\sigma_v = \sqrt{\sigma_z^2 + 3\tau_{xy}^2}
$$

where $$ \sigma_z = \frac{My}{I_{xx}} $$ and $$ \tau_{xy} = \frac{q}{t} $$. Three key points/elements are considered:

**Point 1 (upper left vertex of cross-section)**: The bending stress is:

$$
\sigma_z = \frac{My}{I_{xx}} = \frac{P(1000)(25)}{570000} = 0.0439P
$$

The shear stress is related to the shear flow $$ q_2 $$:

$$
\tau_{xy} = \frac{q_2}{t} = \frac{\frac{-Ptr^2}{2I_{xx}}}{t} = (-5.482 \times 10^{-4})P
$$

Solving for $$ P $$ from the Von Mises stress breakdown:

$$
\begin{aligned}
(125)^2 &= (0.04386P)^2 + 3(5.482 \times 10^{-4} P)^2 \\
(125)^2 &= 0.0019246P^2
\end{aligned}
$$

which results in the force **$$ P_1 = 2849.33 $$ N**.

**Point 2 ($$ r = 25 $$, $$ \theta = 0 $$)**: The bending stress remains the same. The shear stress is related to $$ q_3 $$:

$$
\tau_{xy} = \frac{q_3}{t} = \frac{\frac{-17Ptr^2}{2I_{xx}}}{t} = -0.00932P
$$

Solving for $$ P $$ from the Von Mises stress:

$$
125^2 = (0.04386P)^2 + 3(0.00932P)^2
$$

which results in the force **$$ P_2 = 2674.58 $$ N**.

**Point 3 ($$ r = 25 $$, $$ \theta = \pi/2 $$)**: The bending stress is:

$$
\sigma_z = \frac{P(1000)(0)}{570000} = 0
$$

The shear stress is related to $$ q_4 $$:

$$
\tau_{xy} = \frac{q_{34}(\theta=\pi/2)}{t} = \frac{\frac{-19Ptr^2}{2I_{xx}}}{t} = -0.0104P
$$

Solving for $$ P $$ from the Von Mises stress:

$$
(125)^2 = 0^2 + 3(0.0104P)^2
$$

which results in the force **$$ P_3 = 6939.31 $$ N**.

From this analysis of the X-Y plane, the lowest allowable force is thus $$ P_2 $$.

---

### Lowest allowable force (X-Z Plane)

In the X-Z plane, there are now two bending stresses instead of one. The same analysis is performed for the three points/elements with the following modified Von Mises stress breakdown:

$$
\sigma_v = \sqrt{\sigma_x^2 + \sigma_z^2 - \sigma_x\sigma_z + 3\tau_{xy}^2}
$$

**Point 1 (upper left vertex of cross-section)**: $$ \sigma_z $$ and $$ \tau_{xy} $$ remain the same as before. The bending stress $$ \sigma_x $$ is:

$$
\sigma_x = \frac{P(200+x_s)(25)}{570000} = 0.0138P
$$

Solving for $$ P $$:

$$
(125)^2 = (0.0138P)^2 + (0.0439P)^2 - P^2(0.0138)(0.0439) + 3(5.482 \times 10^{-4} P)^2
$$

which results in the force **$$ P_4 = 3213.9 $$ N**.

**Point 2 ($$ r = 25 $$, $$ \theta = 0 $$)**: $$ \sigma_z $$ and $$ \tau_{xy} $$ remain the same from the previous section. The bending stress $$ \sigma_x $$ is:

$$
\sigma_x = \frac{P x_s (25)}{570000} = 0.00506P
$$

Solving for $$ P $$:

$$
(125)^2 = (0.00506P)^2 + (0.0439P)^2 - P^2(0.00506)(0.0439) + 3(0.00932P)^2
$$

which results in the force **$$ P_5 = 2801.21 $$ N**.

**Point 3 ($$ r = 25 $$, $$ \theta = \pi/2 $$)**: The bending stresses at this point are zero, which means the force created is identical from the previous section, **$$ P_6 = P_3 = 6939.31 $$ N**. 

Therefore, based on this analysis of the X-Y and X-Z planes, the lowest force allowable for a Von Mises stress of 125 MPa is **$$ P_2 = 2674.58 $$ N**.

---

### Finite element analysis: static stress

There are several shortcomings of the analytical approaches (thin-wall approximation, narrow cut, Von Mises stress simplifications) that become apparent when simulating the force and stresses in a numerical simulation. First, the force found in the previous section overshot the predicted stress of 125 MPa, yielding 152 MPa as the wing's maximum Von Mises stress. With trial and error, a force closer to 2180 N fits the safety factor requirements, yielding around 124 MPa as the resulting maximum Von Mises stress. The scenarios are simulated using the default SOLIDWORKS mesh, a remote load at the calculated shear center, and a rigid geometry at the fixed end of the wing.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/wing-analytical-results.jpg" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/wing-numerical-results.jpg" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Stress analysis of the analytical (left) and numerical (right) forces that satisfy the safety factor 2 requirement (< 125 MPa).
</div>

Uniquely, when an applied load transverse load is located on the shear center, the section (ideally) does not experience torsion (twisting). If the force is applied elsewhere, like in the center of the semi-circle, the section will experience much more stress due to the higher presence of torsion. Thus, understanding the forces and geometry of an airplane wing is vital for preventing unwanted rotation and ensuring predictable structural behavior.

<div class="row mt-3">
  <!-- Row 1 -->
  <div class="col-sm-6 mt-3 mt-md-0">
    {% include figure.liquid
      loading="eager"
      path="assets/img/bending-sim.jpg"
      class="img-fluid rounded z-depth-1"
    %}
  </div>

  <div class="col-sm-6 mt-3 mt-md-0">
    {% include figure.liquid
      loading="eager"
      path="assets/img/torsion-sim.jpg"
      class="img-fluid rounded z-depth-1"
    %}
  </div>
</div>

<div class="row mt-3">
  <!-- Row 2 -->
  <div class="col-sm-6 mt-3 mt-md-0">
    <video
      autoplay
      loop
      muted
      playsinline
      class="img-fluid rounded z-depth-1 w-100">
      <source src="{{ '/assets/img/bending.mp4' | relative_url }}" type="video/mp4">
    </video>
  </div>

  <div class="col-sm-6 mt-3 mt-md-0">
    <video
      autoplay
      loop
      muted
      playsinline
      class="img-fluid rounded z-depth-1 w-100">
      <source src="{{ '/assets/img/torsion.mp4' | relative_url }}" type="video/mp4">
    </video>
  </div>
</div>

<div class="caption">
  Pure bending (left) and twisting (right) simulation settings which showcase structural differences due to the location of the downward force.
</div>



