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

---

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
a_f = \begin{bmatrix}0\\a_{fy}\\a_{fz}\end{bmatrix} \quad\quad\quad b_f = \begin{bmatrix}\sqrt{3}b_{fy}\\b_{fy}\\b_{fz}\end{bmatrix} \quad\quad\quad c_f = \begin{bmatrix}-\sqrt{3}c_{fy}\\c_{fy}\\c_{fz}\end{bmatrix}
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

These vectors are related to $$ a_f $$, $$ b_f $$, and $$ c_f $$ by $$ a_f = h + r_a $$, $$ b_f = h + r_b $$, and $$ c_f = h + r_c $$. $$ h = \begin{bmatrix}h_x&h_y&h_z\end{bmatrix}^T $$ represents some offset from the normal vector and the base plane origin. The components of each vector are required to find the rotation of each joint, since they contribute to the $$ \bar{a} $$, $$ \bar{b} $$, and $$ \bar{c} $$ vectors pointing from each base leg to each rotated platform leg shown in Fig. 3. To find these components, the origin is chosen as $$ a_{fx} = 0 $$ since the mechanism contains symmetry:

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
b_f = \begin{bmatrix}b_{fx}\\b_{fy}\\b_{fz}\end{bmatrix} = \begin{bmatrix}\frac{\sqrt{3}e}{2}\left(1-\frac{n_x^2+\sqrt{3}n_xn_y}{1+n_z}\right)\\\frac{e}{2}\left(1-\frac{n_x^2+\sqrt{3}n_xn_y}{1+n_z}\right)\\h_z-\frac{e}{2}(\sqrt{3}n_x+n_y)\end{bmatrix}
$$

For the vector pointing from the base origin to the moving platform leg C:

$$
c_f = \begin{bmatrix}c_{fx}\\c_{fy}\\c_{fz}\end{bmatrix} = \begin{bmatrix}\frac{-\sqrt{3}e}{2}\left(1-\frac{n_x^2-\sqrt{3}n_xn_y}{1+n_z}\right)\\\frac{e}{2}\left(1-\frac{n_x^2-\sqrt{3}n_xn_y}{1+n_z}\right)\\h_z+\frac{e}{2}(\sqrt{3}n_x-n_y)\end{bmatrix}
$$

Finally, the vectors pointing from the base legs to the moving platform legs can be computed, which are used in each stepper motor rotation:

$$
\begin{aligned}
\bar{a} &= a_f - a_0 = \begin{bmatrix}0\\d+\frac{e}{2(1+n_z)}(1-4n_x^2-3n_z^2-2n_z)\\h_z+en_y\end{bmatrix}\\
\bar{b} &= b_f - b_0 = \begin{bmatrix}\frac{\sqrt{3}}{2}\left(e\left(1-\frac{n_x^2+\sqrt{3}n_xn_y}{1+n_z}\right)-d\right)\\\frac{1}{2}\left(e\left(1-\frac{n_x^2+\sqrt{3}n_xn_y}{1+n_z}\right)-d\right)\\h_z-\frac{e}{2}(\sqrt{3}n_x+n_y)\end{bmatrix}\\
\bar{c} &= c_f - c_0 = \begin{bmatrix}
\frac{\sqrt{3}}{2}\left(d-e\left(1-\frac{n_x^2-\sqrt{3}n_xn_y}{1+n_z}\right)\right)\\
\frac{1}{2}\left(e\left(1-\frac{n_x^2-\sqrt{3}n_xn_y}{1+n_z}\right)-d\right)\\
h_z+\frac{e}{2}(\sqrt{3}n_x-n_y)
\end{bmatrix}
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

These derivations and angles are needed because the controller does not command platform tilt directly to the motors. The balancer's high-level goal is to tilt the platform by a certain amount in $$ x $$ and $$ y $$ so the ball rolls toward a target, and the inverse kinematics is the map that turns a desired platform pose $$ (h_z, n_x, n_y, n_z) $$ into the three motor angles $$ (\theta_a, \theta_b, \theta_c) $$. In control terms, the workflow is taking a desired ball motion, converting it to a desired platform orientation, using the inverse kinematic equations to translate into motor angles, and then executing step commands.

---

### Assembly and Circuit Design

The main design choices are split up into mechanical and electrical components. The mechanical concept was first designed and assembled in SolidWorks. Then, the motor and sensors were chosen in accordance with the mechanism

#### Mechanical Design

Most of the physical components were 3D printed. These parts include the base, the two links, motor spacers, platform clips, and the balancing platform. The base features 3 motor mounts which secure each stepper motor. Stepper motors were chosen for this concept because the platform needs precise, repeatable angular motion at each leg, and they are naturally suited for the position controller beacuse they move in discrete step increments. A cylindrical spacer was added to each stepper motor such that the first link can be fastened with a M4 screw and locknut with sufficient spacing. Next, a M3 tie rod was screwed onto the top of the second link, which is used to connect the link to the balancing platform. The ball within the tie rod allows the link to move spherically. These components are fastened using either M3 or M4 screws with the corresponding locknuts for each link. Lastly, four platform clips are used to secure the resistive touch panel to the balancing platform.

Fig. 4 shows the main components described here, as well as a few of the essential electrical components which are discussed next.

2 figs

#### Electrical Design

Fig. 5 shows the circuit for the electromechanical system. The main interfaces regard each TMC2209 motor driver and the touch panel sensor.

fig

The motors require a power source of 24 V, sharing ground with the microcontroller. A $$ 100\mu $$F capacitor is placed in parallel with the $$ V_m $$ and motor GND pins of the motor drivers to stabilize the power supply. Only one Arduino digital output is provided to the enable pin of the driver to act as a control switch for the drivers' internal output stages. Similarly, a constant logic voltage supply (Arduino 5 V) is provided to the three VIO pins, which define the voltage levels for other pins on the drivers. The microstepping pins MS1 and MS2 are both tied to the VIO supply, which selects 16 microsteps; thus, the driver is in 1/16 microstepping mode which provides a finer resolution for the position range of motion. As shown in Fig. 5, motor A corresponds to digital pins 25 and 26 for step and direction, motor B corresponds to digital pins 23 and 24, and motor C corresponds to digital pins 27 and 28. These naming conventions follow from the inverse kinematics for each leg.

The final component consists of the touch panel, which is connected to analog pins on the microcontroller. The touch panel is a 4-wire resistive sensor. Two wires are used to create a voltage gradient across one axis and one of the other wires is read by the Arduino ADC to see where the touch point sits along that gradient. Then the roles are swapped to read the other axis. The panel is wired this way because each of the four wires must sometimes be driven high, sometimes low, sometimes high-impedance, and sometimes read as an analog voltage. The A0-A3 pins give the Arduino the flexibility to excite one axis, measure the other, then switch modes and repeat for the second coordinate.

--- 

### Position Control

Since the touch panel reports voltages corresponding to x and y coordinates, position is the main controllable state. The controller is a discrete-time two axis PID controller built around the ball position using a sampling period of $$ T_s = 5 $$ ms. At each sample $$ k $$, the measured ball and desired positions (defined as the platform center) are

$$
y[k]=\begin{bmatrix}x[k]\\y[k]\end{bmatrix} \quad\quad\quad r=\begin{bmatrix}X_c\\Y_c\end{bmatrix}
$$

The tracking error is thus $$ e[k]=r-y[k] $$, however the control law is split for each axis:

$$
e_x[k]=X_c-x[k] \quad\quad\quad e_y[k]=Y_c-y[k]
$$

The controller in the code is a discrete PID applied independently on the two axes. The integral is updated using a trapezoidal rule and the derivative is a backward difference. To make the integral scale like $$ T_s $$ and the derivative scale like $$ 1/T_s $$, a scale factor for the integral is chosen as $$ T_s/10 = 0.5 $$ and $$ 10/T_s = 2 $$ for the derivative. For either axis $$ j \in x,y $$, the integral and derivative contributions are then

$$
\begin{aligned}
I_j[k] &= \sum_{m=1}^k \frac{1}{2}(e_j[m]+e_j[m-1])\cdot0.5 = \sum_{m=1}^k 0.25 \cdot (e_j[m]+e_j[m-1])\\
D_j[k] &= 2 \cdot (e_j[k]-e_j[k-1])
\end{aligned}
$$

The unsaturated PID output is then

$$
u_j[k] = K_p e_j[k] + K_i \sum_{m=1}^k 0.25 \cdot (e_j[m]+e_j[m-1]) + K_d \cdot 2 \cdot (e_j[k]-e_j[k-1])
$$

To keep the platform from executing excessively large tilt commands, the PID output is clipped at a saturation limit of $$ \pm 0.05 $$:

$$
u_{j,true}[k] = sat(u_j[k], -0.05, 0.05)
$$

These PID outputs do not go straight to the motors, but instead pass through three stages: they become a desired platform orientation command, the orientation is converted into desired motor positions, and the step positions are turned into pulses and directions by the stepper interrupt service routine. The first two stages follow from the inverse kinematics. The controller forms $$ n_x = u_y $$ and $$ n_y = -u_x $$ (sign changes were determined through experimenting with the sensor convention). The terms $$ n_x $$ and $$ n_y $$ along with the constant height term $$ h_z $$ are the inputs to the inverse kinematics problem to compute the angles for each leg. The ISR then drives each motor toward those target angles at a bounded rate.

#### Tuning

The missing piece regards the position responses to the PID output, which rely on the gains $$ K_p $$, $$ K_i $$, and $$ K_d $$. The proportional gain determines how aggressively the system reacts to current error, the integral gain corrects steady-state error, and the derivative gain analyzes the rate of change of the error for stability. With these definitions, it is evident that the controller tasked with balancing the ball primarily depends on $$ K_p $$ and $$ K_d $$. Instead of solving for gains from control theory and time-domain specifications, $$ K_p $$ and $$ K_d $$ were chosen through trial and error. This was an iterative process that examined how fast the ball is commanded to (or through) the center, overall joint and platform oscillation, and how quickly the ball loses velocity. Once a sufficient gain commanding the ball to the center was chosen as $$ K_p $$, then $$ K_d $$ was tuned to experiment with damping. The main strategy was to sweep small neighborhoods of values for $$ K_p $$ or $$ K_d $$ while keeping $$ K_i = 0 $$ and keeping one of the proportional or derivative gains constant.

Althogh the tuning may be improved for other desired qualities, the controller successfully finds a near-equilibrium point in the center of the platform when the ball is placed in each corner. The gains that satisfied this requirement were found as $$ K_p = 175 \times 10^{-6} $$, $$ K_i = 25 \times 10^{-7} $$, and $$ K_d = 1000 \times 10^{-6} $$. A small $$ K_i $$ was ultimately introduced as a correction factor, although a PD controller by itself may also work in this scenario. The position responses after placing the ball in each corner of the platform are given in Fig. 6.

4 figs

---

### Arduino

The code is written and compiled at the register level using ATmega2560 hardware. First, the design parameters and the mathematical and timing tools are established. A structure is defined to store the measured ball position and pressure from the touch panel, constants are declared for the platform geometry, control gains, touch panel, and motor behavior, and utility functions are built to assist with math operations and microsecond/millisecond delays.

A dedicated USART module initializes serial transmission and provides routines for sending characters, strings, integers, and complete CSV data lines. This is used to stream the system to a computer in a format where time, touch status, x position, y position, and pressure are recorded. This module gives the system observability: while the platform is running, the Arduino continuously reports what the touch panel is measuring, which makes it possible to plot the ball motion, debug the controller, and evaluate balancing performance. USART0 is set to 250000 baud for greatest flexibility. Timer0 is used as a millisecond system time base, selected using CTC mode with a prescaler of 64. Timer0 ticks at $$ 16MHz/64=250 $$ kHz therefore 250 counts correspond to $$ 250\times4\mu s=1000\mu s=1 $$ ms. This gives the program a lightweight millisecond clock for logging timestamps. 

To measure x and y position, the code alternates which panel electrodes are driven on the touch sensor and which are left floating, then uses the ADC to sample the resulting voltage. It also computes a pressure quantity to decide whether the ball is actually contacting the surface. A check is used for ADC reliability and the pins are returned to high impedance after each measurement to avoid interfering with later recordings. In effect, this module turns the raw analog touch panel into a ball position sensor, producing real-time feedback needed for the balancing.

As discussed before, the inverse kinematics pipeline converts a desired platform tilt into individual actuator commands for the three legs given the nominal platform height $$ h_z $$ and a desired tilt described by the vector components $$ n_x $$ and $$ n_y $$. Motor motion is handled by a timer-driven step engine built around Timer1. The interrupt service routine runs at a fixed frequency and, for each axis, compares the current motor position to the target position, determines the needed direction, and generates step pulses by directly toggling the appropriate bits on PORTA. In CTC mode, the interrupt frequency is $$ f=\frac{\frac{16MHz}{8}}{99+1}=20,000 $$ Hz. Each motor is run at a commanded step rate while still sharing this periodic interrupt, and the code tracks the current step count so it always knows the estimated actuator position. This module transforms the high-level position targets into properly timed direction and step signals for the three TMC2209 motor drivers.

At startup, the sketch performs a simple homing routine to command all three motors to move upward by a fixed number of steps at a fixed speed. The purpose is to establish the controller's internal reference frame; all later balancing motions are computed and expressed relative to this starting configuration. A separate function is needed to bridge the gap between desired platform pose and actual motor commands. The desired step offsets are computed from inverse kinematics, added to the startup home position, and then target positions and step rates are set. When the ball is detected, the commanded step rate is made proportional to the position error magnitude and then limited by both a maximum speed and a slew rate constraint so the motors do not change speed too abruptly. When no ball is detected, the platform simply returns toward its neutral pose at a defined home rate. This module is important because it shapes the physical response of the machine, ensuring that the platform moves smoothly and within appropriate speed limits instead of instantly jumping to new commands.

Lastly, the main loop implements the balancing controller. Every cycle, it reads the current ball position, computes the x and y error relative to the desired center point, and then forms proportional, integral, and derivative terms to create two control outputs for each axis. These outputs are interpreted as desired platform tilt commands, which are passed into the inverse kinematics and target generation modules. If the ball is not detected, all controller states are reset and the platform is driven back to level. Although the sketch defines the control period as $$ T_s=5 $$ ms, the control loop is not exactly locked to this interval because it uses a software delay plus blocks ADC and UART operations. Therefore it is best described as a 200 Hz control loop rather than a hard-fixed 200 Hz interrupt-driven controller. In contrast, the step generation is much more deterministic because it is handled by Timer1 at 20 kHz.

---

### Results

The main results are collected as qualitative and quantiative observations measuring repeatability, steady-state error, settling time, overshoot, and balance time. As shown in Fig. 6, the controller has proven to find a near equilibrium when the ball is placed on the platform, and those results are expanded further in this section.

#### Repeatability and Balance Time

Repeatability is tested by measuring the number of failures (when the ball falls off the platform after placement) for several trials. Table 1 shows the results and the success rate using each corner of the platform as a starting position.

table 1

As shown in the results, starting positions on the right side of the platform often lead to failed responses. This is most likely due to a systematic bias that disadvantages the right side. As shown in Fig. 7, the right side of the platform is slightly inclined upon startup (most likely due to inconsistency in the motor steps), meaning there is a small gravitational component that sometimes provides the ball with too much energy for the controller to dissipate.

fig

Despite this small bias, the controller still proves to successfully navigate the ball toward the desired point, especially for starting positions on the left side of the platform. Balance time is not presented here as a formal statistic because once the ball survives the initial displacement from the platform center, the controller is able to idle it for a prolonged duration, as shown below.

video

#### Steady-State Error, Settling Time, and Overshoot

Along with repeatability, certain time-domain statistics can be measured in the position responses. A Python script was developed to read the Arduino and compute steady-state error (in touch panel counts), settling time, and percent overshoot for each position on a given trajectory. The trajectories were gathered for the four starting positions and results were averaged over ten trials. Table 2 shows these results for starting positions on the left side of the platform. The settling band was chosen as $$ \pm 75 $$ counts in alignment with the controller's somewhat oscillatory performance.

table 2

When the ball is placed on the left side, the balancer is able to recover and bring the ball near the center, but the response is not equally strong in both axes. The x-direction response is much faster, however this comes with relatively large overshoot, showing that the x-axis response is underdamped and somewhat aggressive. The controller reacts quickly to the initial position error, but it drives the ball past the target before damping out the motion. The y-direction behaves differently, but it is biased away from teh desired position and does not correct the final error as effectively. Fig. 8 provides sample trajectories for either starting position, and it is evident that although the y position plateaus, it does not reach its desired state. This may be due to the dominance of the control law in the x direction, or simply because there is mechanical asymmetry, inverse kinematic nonlinearities, or unveen control authority from the three motors.

2 figs

Overall, these results show that the controller is stable and capable of saving the ball from left-side starting positions, although the tuning is uneven. The x-axis is fast but underdamped while the y-axis is slower and has a larger steady-state offset. This suggests that future tuning should focus on reducing X overshoot while improving y-axis steady-state accuracy and response speed.

Table 3 and Fig. 9 present the same response statistics for starting positions on the right side of the platform. When the ball is placed on the right side, the system again succeeds in recovering and stabilizing the ball near the desired position, but the response characteristics are noticeably more extreme.

table 3

2 figs

In the x direction, the system responds very quickly however this response is accompanied by very large overshoot, indicating an even more strongly underdamped response than was observed on the left side. The main difference is in the y direction responses, which exhibit extremely large overshoot values. This means the ball not only crosses the desired position but does so with a very large excursion in the opposite  direction before recovering. Despite this, the system still dissipates these large oscillations at the expense of slower settling times. Compared to the left side results, the right side responses are significantly more oscillatory and less well-controlled. Along with the discovery that the platform is not fully level (Fig. 7), there may also be minor nonlinearities in the assembly or certain assumptions of the inverse kinematics are less trustworthy. The right side responses reveal a tendency toward excessive gain or insufficient damping, highlighting the need for improved balance between responsiveness and stability as well as better handling of the axis coupling and steady-state error.

---

### Conclusions and Further Work

Several of these results may be improved primarily through further tuning of the PID controller gains. A useful next step would be to tune separate gains for the x and y axes, or even use region-based gains depending on where the ball is on the platform. Also, the step rates of the motors can be potentially tuned to limit oscillatory behavior in the tilting of the platform. However, despite these imperfections, the balancing concept is successful in achieving the main goals of finding a near equilibrium at a desired platform position. This proves that the controller and inverse kinematics pipelines function as expected and with decently robust performance. Another success of the project is that once the ball reaches a steady state, the platform will continue to balance it if external forces are applied, although settling time usually increases. 

Along with the controller, the mechanical system could also be improved. Future work could include calibrating each actuator, improving the linkages, or stiffening and leveling the platform. These changes would make the control problem easier and reduce directional bias. 

A more advanced extension would be implementing a better control strategy, such as full-state feedback, LQR control, or model predictive control. These methods could account for both position and velocity of the ball more directly rather than relying only on a PID-style correction. A dynamic model of the ball-platform interaction could also be developed and compared against experimental results. Along with this, filtering the touch sensor data, estimating ball velocity more accurately, and logging more trials would make the performance metrics more reliable. The system could also be tested for different desired positions, different ball masses, and disturbance rejection (such as tapping the ball or repeatedly moving the target position during operation).


