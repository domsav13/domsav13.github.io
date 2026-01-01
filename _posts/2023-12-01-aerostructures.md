---
layout: post
title: deformation of a wing
date: 2023-12-01 11:12:00-0400
description: stress analysis of an airplane wing
tags: 
categories: 
related_posts: false
---

Consider a cross-section of an airplane wing, approximated as a cantilever beam. The wing is made of Aluminum 6061 (elastic modulus $$ E = 70 $$ GPa, Poisson's ratio $$ \nu = 0.3 $$, and yield stress $$ \sigma_y = 250 $$ MPa) and experiences a downward force $$ P $$ applied at the shear center due to a turbojet engine.

### Shear flows and shear center

First, the shear center of the cross-section will be calculated analytically. The shear flow $$ q(s) = \frac{-S_y}{I_{xx}} \int_0^s ty ds $$ is used where $$ t $$ is the section thickness, $$ S_y $$ is a placeholder force located on the shear center, $$ I_{xx} $$ is the second moment of area of the section about the x-axis, and $$ s $$ is the path of the shear flow. With $$ r = 25 $$ and $$ t = 2 $$, $$ I_{xx} $$ is calculated as:

$$
\begin{aligned}
I_{xx}
&= \frac{(2r)^3 t}{12}
+ 2\left(\frac{8 r t^3}{12} + 8 r^3 t\right)
+ 2 \int_{0}^{\pi/2} t r^2 \cos^2\theta \, r d\theta \\
&= \frac{2}{3}r^3 t + 16 r^3 t
+ 2 r^3 t \int_{0}^{\pi/2} \cos^2\theta \, d\theta \\
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
&= \frac{-S_y}{I_{xx}} \int_{0}^{s_2} t r \, ds_2 + q_2 \\
&= \frac{-S_y}{I_{xx}} t r s_2 - \frac{S_y}{2 I_{xx}} t r^2 = \frac{-S_y}{I_{xx}} t \left(rs_2 + \frac{r^2}{2}\right)
\end{aligned}
$$

with $$ q_3(s_2=8_r) = \frac{-S_y}{I_{xx}} t \left(8r^2 + \frac{r^2}{2}\right) = \frac{-17S_y t r^2}{2 I_{xx}} $$. 
In wall 34, $$ y = r \cos\theta $$:

$$
\begin{aligned}
q_{34}(\theta)
&= \frac{-S_y}{I_{xx}} \int_{0}^{\theta} t r \cos\theta r, d\theta + q_3 \\
&= \frac{-S_y}{I_{xx}} t r^2 \int_{0}^{\theta} \cos\theta d\theta - \frac{17S_y}{2 I_{xx}}tr^2 \\
&= \frac{-S_y}{I_{xx}} tr^2 \left(\sin\theta + \frac{17}{2}\right)
\end{aligned}
$$

Next, a sum of moments is used at the origin of the semi-circle to solve for the distance to shear center $$ x_s $$ using the calculated shear flows and the placeholder force $$ S_y $$. The shear flows $$ q_{12} $$, $$ q_{23} $$, and $$ q_{34} $$ all have symmetry in the section:

$$
\begin{aligned}
M_o
&= 0 \\
S_yx_s &= -2 \left( \int_{0}^{r} q_{12} 8r ds + \int_{0}^{8r} q_{23} r ds + \int_{0}^{\pi/2} q_{34} r^2 d\theta \right) \\
S_yx_s &= -2 \left(\frac{-4s_y}{3I_{xx}}tr^4 - \frac{36S_y}{I_{xx}}tr^4 - \frac{14.35S_y}{I_{xx}}tr^4 \right) \\
S_yx_s &= \frac{87.37S_y}{I_{xx}}tr^4
\end{aligned}
$$

Thus, the distance of the shear enter from the origin of the semi-circle is:

$$
x_s = \frac{87.37}{18.24(25)^3(2)} (2)(25)^4 = 119.75 mm
$$

### Lowest allowable force, analytically
