---
layout: post
title: Nonlinear control of a DC motor
date: 2025-11-25 11:12:00-0400
description: Control system design using Lyapunov stability and sliding manifolds
tags: 
categories: 
thumbnail: assets/img/nonlinear.jpg
related_posts: false
---

### Setup

The topic of study is the implementation of nonlinear control frameworks on the motor wheel system below. The true system dynamics are modeled separately as a Python simulator including several nonlinear effects such as stribeck friction, aerodynamic resistance, and more.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/motor.jpg" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    A DC motor connected to a wheel, the electromechanical system for this analysis.
</div>

A linear system can be formed for this system, but it is better represented with nonlinear, affine assumptions:

$$
\dot{\omega}=f(\omega)+g(\omega)v_{in}
$$

Two commonly used nonlinear methods include adaptive control and sliding mode control, which will be explored in further detail in the following sections. Adapative control makes the controller learn the dynamics in real time while maintaining stability whereas sliding mode control forces the states of a system to reach a predetermined sliding surface where the dynamics are designed to be stable and insensitive to disturbances.

---

### Model Reference Adaptive Control

Model reference adaptive control (MRAC) is an architecture in which a reference model representing ideal closed-loop behavior is chosen and the controller adjusts its own parameters in real time to force the plant to follow the reference. The following reference model will be used:

$$
\dot{\omega}_m=-10\omega_m+10r
$$

---

#### Linear MRAC

There are two methods for performing MRAC: direct and indirect. In both cases, the controller must be designed to follow the reference model with the given linear dynamics that approximate the system:

$$
\dot{\omega}=a \omega + bv_{in}
$$

To achieve an equivalence for the reference model, the controller $$ v_{in}^* = \frac{1}{b}\left(-(a+a_m)\omega+b_mr\right) is used:

$$
\begin{aligned}
\dot{\omega}&=a \omega+bv_{in}^*\\
&= a\omega + b\left(\frac{1}{b}(-(a+a_m)\omega+b_mr)\right)
&= -a_m\omega+b_mr
\end{aligned}
$$

where $$ a_m=b_m=10 $$ are chosen to match the previously established reference model $$ \dot{\omega}_m $$.

---
##### Direct MRAC

In direct MRAC, the controller gains are directly adapted with weights $$ \hat{\alpha} $$ and $$ \hat{\beta} $$ for $$ v_{in} = -\hat{\alpha}\omega+\hat{\beta}r $$. The dynamics become:

$$
\begin{aligned}
\dot{\omega}&=a\omega+bv_{in}\\
&= (a-b\hat{\alpha})\omega+b\hat{\beta}r\\
\dot{\omega}_m&=-a_m\omega_m + b_mr
\end{aligned}
$$

where the unknown, ideal gains $$ (\alpha, \beta) $$ match the model: $$ a - b\alpha = -_am $$ and $$ b\beta=b_m $$. With the error terms $$ \bar{\alpha}=\hat{\alpha}-\alpha $$ and $$ \bar{\beta}=\hat{\beta}-\beta $$, the dynamics are expanded further to:

$$
\begin{aligned}
\dot{\omega}&=a\omega+b(-\hat{\alpha}\omega+\hat{\beta}r)\\
&= a\omega -b\omega(\bar{\alpha}+\alpha)+br(\bar{\beta}+\beta)\\
&= (a-b\bar{\alpha}-b\alpha)\omega+(b\bar{\beta}+b\beta)r\\
&= (-a_m-b\bar{\alpha})\omega+(b\bar{\beta}+b_m)r
\end{aligned}
$$

The Lyapunov function $$ V(e,\bar{\alpha},\bar{\beta}) = \frac{1}{2}e^2+\frac{|b|}{2\gamma_1}\bar{\alpha}^2+\frac{|b|}{2\gamma_2}\bar{\beta}^2 $$ (where $$ \gamma_1 $$ and $$ \gamma_2 $$ are positive real values) is used with the adaptation laws $$ \dot{\hat{\alpha}}=\gamma_1 sign(b) \omega e $$ and $$ \dot{\hat{\beta}} = -\gamma_2 sign(b) r e $$ to guarantee negative definiteness in the tracking error, which ensures stability of the MRAC closed-loop system. Before showing that $$ \dot{V} \le 0 $$ with this setup, the time derivative of the error term $$ e = \omega - \omega_m $$ is needed:

$$
\begin{aligned}
\dot{e}&=\dot{\omega}-\dot{\omega}_m\\
&= (-a_m-b\bar{\alpha})\omega+(b\bar{\beta}+b_m)r-(-a_m\omega_m+b_mr)\\
&= -a_m(\omega-\omega_m)-b\bar{\alpha}\omega+b\bar{\beta}r\\
&= -a_me-b\bar{\alpha}\omega+b\bar{\beta}r
\end{aligned}
$$

Using the aforementioned Lyapunov function, its derivative (proving negative definiteness) is:

$$
\begin{aligned}
\dot{V}(e,\bar{\alpha},\bar{\beta})&=e\dot{e}+|b|sign(b)\omega e \bar{\alpha} - |b|sign(b)r e \bar{\beta}\\
&= e(-a_me-b\bar{\alpha}\omega+b\bar{\beta}r)+b\omegae\bar{\alpha}-bre\bar{\beta}\\
&= -a_me^2
\end{aligned}
$$

---

##### Indirect MRAC

In indirect MRAC, the parameters of the plant model are estimated and used to calculate the gains for the control law. With estimates $$ \hat{a} $$ and $$ \hat{b} $$ for ideal gains $$ a $$ and $$ b $$, the control law is established as:

$$
v_{in}=\frac{1}{\hat{b}}\left(-(a_m+\hat{a})\omega+b_mr\right)
$$

With the error terms $$ \bar{a} = \hat{a} - a $$ and $$ \bar{b}=\hat{b}-b $$, the dynamics are expanded to:

$$
\begin{aligned}
\dot{\omega}&=a\omega+bv_{in}\\
&= a\omega + \frac{b}{\hat{b}\left(-(a_m+\hat{a})\omega+b_mr\right)\\
&= a\omega + (1-\frac{\bar{b}}{\hat{b}}\left(-(a_m+\hat{a})\omega+b_mr\right)\\
&= a\omega-(a_m+\hat{a})\omega+b_mr+\frac{\bar{b}}{\hat{b}}(a_m+\hat{a})\omega-\frac{\bar{b}}{\hat{b}}b_mr\\
&= -(a_m+\bar{a})\omega+b_mr+\frac{\bar{b}{\hat{b}}\left((a_m+\hat{a})\omega-b_mr\right)
\end{aligned}
$$

With the adaptation laws $$ \dot{\hat{a}} = \gamma_1\omegae $$ and $$ \dot{\hat{b}} = \gamma_2v_{in}e $$ the time derivative of the Lyapunov function $$ v(e,\bar{a},\bar{b}) = \frac{1}{2}e^2 + \frac{1}{2\gamma_1}\bar{a}^2+\frac{1}{2\gamma_2}\bar{b}^2 $$ will be negative definite, where $$ \gamma_1 $$ and $$ \gamma_2 $$ are positive real values. To show this, the time derivative of the error term $$ e = \omega - \omega_m $$ is needed again:

$$
\begin{aligned}
\dot{e}&=\dot{\omega}-\dot{\omega}_m\\
&= -a_m(\omega-\omega_m)-\bar{a}\omega+\frac{\bar{b}}{\hat{b}}\left((a_m+\hat{a})\omega-b_mr\right)\\
&= -a_me-\bar{a}\omega+\frac{\bar{b}}{\hat{b}}\left((a_m+\hat{a})\omega-b_mr\right)
\end{aligned}
$$

Then, the derivative of the Lyapunov function (proving negative definiteness) is:

$$
\begin{aligned}
\dot{v}(e,\bar{a},\bar{b})&=e\dot{e}+\frac{1}{\gamma_1}\bar{a}\dot{\bar{a}}+\frac{1}{\gamma_2}\bar{b}\dot{\bar{b}}\\
&= e\left(-a_me-\bar{a}\omega+\frac{\bar{b}}{\hat{b}}\left((a_m+\hat{a})\omega-b_mr\right)+\bar{a}\omegae+\bar{b}ev_{in}\\
&= -a_me^2+\frac{\bar{b}}{\hat{b}}e\left((a_m+\hat{a})\omega-b_mr\right)+\bar{b}e\frac{1}{\hat{b}}\left(-(a_m+\hat{a})\omega+b_mr\right)\\
&= -a_me^2

---

#### Comparison
