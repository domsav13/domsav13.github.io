---
layout: post
title: 3-RRS Ball Balancing Robot
date: 2026-05-06 11:12:00-0400
description: Design of a self-tilting robotic platform with a PID controller
tags: 
categories: 
thumbnail: assets/img/ball_balancer.jpg
related_posts: false
---

### Introduction

In many applications, equilibrium is not naturally stable and must be actively controlled. In this application, the task is inherently challenging: a ball is unstable on a platform, so a mechatronic system must detect its position and quickly adjust the platform orientation to keep the ball near a desired location. Because of this, balancing mechanisms demand a significant amount of closed-loop control, mathematical modeling, sensor integration, and multi-actuator coordination. Fig. 1 shows the mechanical concept for the balancer which consists of a three revolute-revolute-spherical (3-RRS) parallel manipulator.

fig

The two revolute joints occur at the motor shaft and between the links, whereas the spherical joint interfaces with the platform. By clamping a resistive touch panel to the platform, the microcontroller will be able to detect the position of a sufficiently heavy ball.

The work included in this project spans several domains. First, a mathematical model is derived using inverse kinematics to provide a relationship between the platform control objects and motor commands, making coordinated balancing possible. Then, hardware choices are detailed for both the mechanical and electrical components. Lastly, a PID controller is tuned to determine how much the platform should tilt based on where the ball is and how it is moving.

### Inverse Kinematics

The robot is able to angle itself through the use of inverse kinematics equations, which calculate the position to move each stepper motor in order to achieve a desired platform orientation. To obtain these desired orientatinos, the system must be modeled using a combination of geometry, vector algebra, and rotation kinematics. First, the base and platform are modeled as equilateral triangles in the XY-plane, as shown in Fig. 2. For the base and platform, each leg is an equal distance $$ d $$ or $$ e $$ from the corresponding triangle center.

fig

Leg A is taken as the vertical corner with respect to the origin, and legs B and C correspond to teh remaining triangle vertices, with symmetry about the y-axis. Using the equilateral triangle, the x-coordinate for each of these points is $$ x = \pm \frac{\sqrt{3}}{2}d $$ and the y-coordinate is $$ y = \frac{d}{2} $$. Thus, the vertices of the base are

$$
a_0 = \begin{bmatrix}0\\-d\\0\end{bmatrix} \quad\quad\quad b_0 = \begin{bmatrix}\frac{\sqrt{3}d}{2}\\\frac{d}{2}\\0\end{bmatrix} \quad\quad\quad c_0 = \begin{bmatrix}\frac{-\sqrt{3}d}{2}\\\frac{d}{2}\\0\end{bmatrix}
$$

The vertices of the platform are dynamic, but their fixed local coordinates follow the same convention

$$
a_{p,0} = \begin{bmatrix}0\\-e\\0\end{bmatrix} \quad\quad\quad b_{p,0} = \begin{bmatrix}\frac{\sqrt{3}e}{2}\\\frac{e}{2}\\0\end{bmatrix} \quad\quad\quad c_{p,0} = \begin{bmatrix}\frac{-\sqrt{3}e}{2}\\\frac{e}{2}\\0\end{bmatrix}
$$

The platform tilts and moves vertically, but its center does not translate in the $$ x $$ or $$ y $$ directions. Therfore, the centroid of the moving platform in the base frame can be defined as

$$
h = \begin{bmatrix}h_x\\h_y\\h_z\end{bmatrix} \quad\quad\quad = \begin{bmatrix}0\\0\\h_z\end{bmatrix}
$$

Next, the system must be examined in three dimensions using vectors and rotations. Fig. 3 shows the model and relations between the base, platform, links, and relevants rotations and vectors.

fig

Let $$ a_f $$, $$ b_f $$, and $$ c_f $$ be the position vectors pointing from the base origin to the 3 moving platform corner points after tilting. These 3 vectors form an equilateral triangle centered at $$ h $$. $$ a_f $$ lies on the symmetry plane whereas $$ b_f $$ and $$ c_f $$ are mirrored. The components of these vectors are initialized as

$$
a_f = \begin{bmatrix}0\\a_{fy}\\a_{fz}\end{bmatrix} \quad\quad\quad \b_f = \begin{bmatrix}\sqrt{3}b_{fy}\\b_{fy}\\b_{fz}\end{bmatrix} \quad\quad\quad c_f = \begin{bmatrix}-\sqrt{3}c_{fy}\\c_{fy}\\c_{fz}\end{bmatrix}
$$

These components are a function of the vectors pointing from the platform center to each platform corner. Thus, a rotation matrix is needed such that

$$
Rk = \hat{n}
$$

where $$ k = \begin{bmatrix}0&0&1\end{bmatrix}^T $$ and $$ \hat{n} = \begin{bmatrix}n_x&n_y&n_z\end{bmatrix}^T $$ is the unit vector normal to the tilted platform plane. For non-parallel vectors, the matrix that maps $$ k $$ and $$ \hat{n} $$ can be computed using the Rodrigues formula:

$$
R = I + [v]_x + [v]_x^2 \frac{1}{1+c}
$$

where $$ v = \begin{bmatrix}v_1&v_2&v_3\end{bmatrix}^T = k \times \hat{n} = \begin{bmatrix}-n_y&n_x&0\end{bmatrix}^T $$, $$ c = k \cdot \hat{n} = n_z $$, and $$ [v]_x $$ is the skew-symmetric matrix:

$$
[v]_x = \begin{bmatrix}0&-v_3&v_2\\v_3&0&-v_1\\-v_2&v_1&0\end{bmatrix} = \begin{bmatrix}0&0&n_x\\0&0&n_y\\-n_x&-n_y&0\end{bmatrix}
$$

Thus, the rotation between $$ k $$ and $$ \hat{n} $$ is

$$
R = \begin{bmatrix}1-\frac{n_x^2}{1+n_z}&\frac{-n_xn_y}{1+n_z}&n_x\\\frac{-n_xn_y}{1+n_z}&1-\frac{n_y^2}{1+n_z}&n_y\\-n_x&-n_y&1-\frac{n_x^2+n_y^2}{1+n_z}\end{bmatrix}
$$

With this rotation, the corner vectors relative to teh platform center when tilted can be found. For leg A:

$$
r_a = R\begin{bmatrix}0\\-e\\0\end{bmatrix} = \begin{bmatrix}\frac{en_xn_y}{1+n_z}\\\frac{e(n_y^2-n_z-1)}{1+n_z}\\en_y\end{bmatrix}
$$

For leg B:

$$
r_b = R\begin{bmatrix}\frac{\sqrt{3}e}{2}\\\frac{e}{2}\\0\end{bmatrix} = \begin{bmatrix}e\left(\frac{\sqrt{3}(1+n_z-n_x^2)-n_xn_y}{2(1+n_z)}\right)\\e\left(\frac{1+n_z-n_y^2-\sqrt{3}n_xn_y}{2(1+n_z)}\right)\\\frac{-e}{2}(\sqrt{3}n_x+n_y)\end{bmatrix}
$$

For leg C:

$$
r_c = R\begin{bmatrix}\frac{-\sqrt{3}e}{2}\\\frac{e}{2}\\0\end{bmatrix} = \begin{bmatrix}e\left(\frac{-\sqrt{3}(1+n_z-n_x^2)+n_xn_y}{2(1+n_z)}\right)\\e\left(\frac{1+n_z-n_y^2+\sqrt{3}n_xn_y}{2(1+n_z)}\right)\\\frac{e}{2}(\sqrt{3}n_x-n_y)\end{bmatrix}
$$

These vectors are related to $$ a_f $$, $$ b_f $$, and $$ c_f $$ by $$ a_f = h + r_a $$, $$ b_f = h + r_b $$, and $$ c_f = h + r_c $$. $$ h = \begin{bmatrix}h_x&h_y&h_z\end{bmatrix}^T represents some offset from the normal vector and the base plane origin. The components of each vector are required to find the rotation of each joint, since they contribute to the $$ \bar{a} $$, $$ \bar{b} $$, and $$ \bar{c} $$ vectors pointing from each base leg to each rotated platform leg shown in Fig. 3. To find these components, the origin is chosen as $$ a_{fx} = 0 $$ since the mechanism contains symmetry:

$$
\begin{aligned}
a_{fx}&=0=h_x+\frac{en_xn_y}{1+n_z}\\
h_x&=\frac{-en_xn_y}{1+n_z}
\end{aligned}
$$

$$ h_z $$ is constant since the base and platform are a set height from each other, and $$ h_y $$ is found by relating $$ b_{fx} $$ and $$ b_{fy} $$:

$$
\begin{aligned}
b_{fx}&=h_x + \frac{e(\sqrt{3}(1+n_z-n_x^2)-n_xn_y)}{2(1+n_z)}\\
&= \sqrt{3}b_{fy}\\
&= \sqrt{3}\left(\frac{e(1+n_z-n_y^2-\sqrt{3}n_xn_y)}{2(1+n_z)}+h_y\right)
\end{aligned}
$$

which leads to the expression $$ h_y = \frac{e(-n_x^2+n_y^2)}{2(1+n_z)} $$. Using this convention, the components for all the vectors can be found. For the vector pointing from the base origin to the moving platform leg A:

$$
a_f = \begin{bmatrix}a_{fx}\\a_{fy}\\a_{fz}\end{bmatrix} = \begin{bmatrix}0\\\frac{e}{2(1+n_z)}(1-4n_x^2-3n_z^2-2n_z)\\h_z+en_y\end{bmatrix}
$$

For the vector pointing from the base origin to the moving platform leg B:

$$
b_f = \begin{bmatrix}b_{fx}\\b_{fy}\\b_{fz}\end{bmatrix} = \begin{bmatrix}\frac{\sqrt{3}e}{2}\left(1-\frac{n_x^2+\sqrt{3}n_xn_y}{1+n_z}\right)\\\frac{e}{2}\left(1-\frac{n_x^2+\sqrt{3}n_xn_y}{1+n_z}\right)\\h_z-\frac{e}{2}(\sqrt{3}n_x+n_y)}\end{bmatrix}
$$

For the vector pointing from the base origin to the moving platform leg C:

$$
c_f = \begin{bmatrix}c_{fx}\\c_{fy}\\c_{fz}\end{bmatrix} = \begin{bmatrix}\frac{-\sqrt{3}e}{2}\left(1-\frac{n_x^2-\sqrt{3}n_xn_y}{1+n_z}\right)\\\frac{e}{2}\left(1-\frac{n_x^2-\sqrt{3}n_xn_y}{1+n_z}\right)\\h_z+\frac{e}{2}(\sqrt{3}n_x-n_y)\end{bmatrix}
$$

Finally, the vectors pointing from the base legs to the moving platform legs can be computed, which are used in each stepper motor rotation:

$$
\begin{aligned}
\bar{a} &= a_f - a_0 = \begin{bmatrix}0\\d+\frac{e}{2(1+n_z)}(1-4n_x^2-3n_z^2-2n_z)\\h_z+en_y\end{bmatrix}
\bar{b} &= b_f - b_0 = \begin{bmatrix}\frac{\sqrt{3}}{2}\left(e\left(1-\frac{n_x^2+\sqrt{3}n_xn_y}{1+n_z}\right)-d\right)\\\frac{1}{2}\left(e\left(1-\frac{n_x^2+\sqrt{3}n_xn_y}{1+n_z}\right)-d\right)\\h_z-\frac{e}{2}(\sqrt{3}n_x+n_y)\end{bmatrix}
\bar{c} &= c_f - c_0 = \begin{bmatrix}\frac{\sqrt{3}{2}\left(d-e\left(1-\frac{n_x^2-\sqrt{3}n_xn_y}{1+n_z}\right)\right)\\\frac{1}{2}\left(e\left(1-\frac{n_x^2-\sqrt{3}n_xn_y}{1+n_z}\right)-d\right)\\h_z+\frac{e}{2}(\sqrt{3}n_x-n_y)\end{bmatrix}
\end{aligned}
$$

The corresponding magnitudes are $$ a_m = \sqrt{\bar{a}_y^2+\bar{a}_z^2} $$, $$ b_m = \sqrt{\bar{b}_x^2+\bar{b}_y^2+\bar{b}_z^2} $$, and $$ c_m = \sqrt{\bar{c}_x^2+\bar{c}_y^2+\bar{c}_z^2} $$. With these known vectors, the rotation of each leg can be obtained through geometry, which is directly used to step each motor. Each joint angle is a combination of a pointing angle $$ \phi_i $$ (from the leg's base reference direction to the leg vector) and a closure angle $$ \beta_i $$ (between the links and the leg vector, from the law of cosines). The closure angles for each leg are:

$$
\beta_a = \cos^{-1}\left(\frac{a_m^2+f^2-g^2}{2a_mf}\right) \quad\quad\quad \beta_b = \cos^{-1}\left(\frac{b_m^2+f^2-g^2}{2b_mf}\right) \quad\quad\quad \beta_c = \cos^{-1}\left(\frac{c_m^2+f^2-g^2}{2c_mf}\right)
$$

For leg A, the joint lies in the YZ-plane, so the natural reference direction is the positive y-axis. The angle from the positive y-axis to $$ \bar{a} $$ is found through 

$$
\cos \phi_a = \frac{\bar{a}\cdot\hat{y}}{||\bar{a}||} = \frac{a_y}{a_m}
$$

thus the total angle is 

$$
\theta_a = \cos^{-1}\left(\frac{a_y}{a_m}\right) + \cos^{-1}\left(\frac{a_m^2+f^2-g^2}{2a_mf}\right)
$$

For leg B, the reference direction is not the global y-axis but rather the inward radial direction from $$ b_0 $$ to the base center. That unit direction is $$ \hat{u}_b = \begin{bmatrix}\frac{-\sqrt{3}}{2}&\frac{-1}{2}&0\end{bmatrix}^T $$, so the pointing angle is

$$
\cos \phi_b = \frac{\bar{b}\cdot\hat{u}_b}{b_m} = \frac{\sqrt{3}b_x+b_y}{-2b_m}
$$

and the total angle is

$$
\theta_b = \cos^{-1}\left(\frac{\sqrt{3}b_x+b_y}{-2b_m}\right) + \cos^{-1}\left(\frac{b_m^2+f^2-g^2}{2b_mf}\right)
$$

Leg C is the mirror of leg B about the y-axis, thus the pointing angle is

$$
\cos \phi_c = \frac{\sqrt{3}c_x-c_y}{2c_m}
$$

and the total angle is

$$
\theta_c = \cos^{-1}\left(\frac{\sqrt{3}c_x-c_y}{2c_m}\right) + \cos^{-1}\left(\frac{c_m^2+f^2-g^2}{2c_mf}\right)
$$

These derivations and angles are needed because the controller does not command platform tilt directly to the motors. The balancer's high-level goal is to tilt the platform by a certain amount in $$ x $$ and $$ y $$ so the ball rolls toward a target, and the inverse kinematics is the map that turns a desired platform pose $$ (h_z, n_x, n_y, n_z) $$ into the three motor angles $$ (\theta_a, \theta_b, theta_c) $$. In control terms, the workflow is taking a desired ball motion, converting it to a desired platform orientation, using the inverse kinematic equations to translate into motor angles, and then executing step commands.

### Assembly and Circuit Design
