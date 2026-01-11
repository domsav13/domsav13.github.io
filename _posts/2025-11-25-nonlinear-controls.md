---
layout: post
title: Nonlinear Control of a DC Motor
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

To achieve an equivalence for the reference model, the controller
$$
v_{in}^* = \frac{1}{b}\left(-(a+a_m)\omega+b_mr\right)
$$
is used:

$$
\begin{aligned}
\dot{\omega}&=a \omega+bv_{in}^*\\
&= a\omega + b\left(\frac{1}{b}(-(a+a_m)\omega+b_mr)\right)\\
&= -a_m\omega+b_mr
\end{aligned}
$$

where $$ a_m=b_m=10 $$ are chosen to match the previously established reference model $$ \dot{\omega}_m $$.

---
##### Direct MRAC

In direct MRAC, the controller gains are directly adapted with weights $$ \hat{\alpha} $$ and $$ \hat{\beta} $$ for
$$
v_{in} = -\hat{\alpha}\omega+\hat{\beta}r
$$
The dynamics become:

$$
\begin{aligned}
\dot{\omega}&=a\omega+bv_{in}\\
&= (a-b\hat{\alpha})\omega+b\hat{\beta}r\\
\dot{\omega}_m&=-a_m\omega_m + b_mr
\end{aligned}
$$

where the unknown, ideal gains $$ (\alpha, \beta) $$ match the model:
$$
a - b\alpha = -a_m
$$
and
$$
b\beta=b_m
$$

With the error terms $$ \bar{\alpha}=\hat{\alpha}-\alpha $$ and $$ \bar{\beta}=\hat{\beta}-\beta $$, the dynamics are expanded further to:

$$
\begin{aligned}
\dot{\omega}&=a\omega+b(-\hat{\alpha}\omega+\hat{\beta}r)\\
&= a\omega -b\omega(\bar{\alpha}+\alpha)+br(\bar{\beta}+\beta)\\
&= (a-b\bar{\alpha}-b\alpha)\omega+(b\bar{\beta}+b\beta)r\\
&= (-a_m-b\bar{\alpha})\omega+(b\bar{\beta}+b_m)r
\end{aligned}
$$

The Lyapunov function
$$
V(e,\bar{\alpha},\bar{\beta}) = \frac{1}{2}e^2+\frac{|b|}{2\gamma_1}\bar{\alpha}^2+\frac{|b|}{2\gamma_2}\bar{\beta}^2
$$
(where $$ \gamma_1 $$ and $$ \gamma_2 $$ are positive real values) is used with the adaptation laws
$$
\dot{\hat{\alpha}}=\gamma_1 \operatorname{sign}(b)\,\omega e
$$
and
$$
\dot{\hat{\beta}} = -\gamma_2 \operatorname{sign}(b)\, r e
$$
to guarantee negative definiteness in the tracking error, which ensures stability of the MRAC closed-loop system. Before showing that $$ \dot{V} \le 0 $$ with this setup, the time derivative of the error term $$ e = \omega - \omega_m $$ is needed:

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
\dot{V}(e,\bar{\alpha},\bar{\beta})
&=e\dot{e}+|b|\operatorname{sign}(b)\omega e \bar{\alpha}
 - |b|\operatorname{sign}(b)r e \bar{\beta}\\
&= e(-a_me-b\bar{\alpha}\omega+b\bar{\beta}r)
 +b\omega e\bar{\alpha}-br e\bar{\beta}\\
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
&= a\omega + \frac{b}{\hat{b}}\left(-(a_m+\hat{a})\omega+b_mr\right)\\
&= a\omega + \left(1-\frac{\bar{b}}{\hat{b}}\right)\left(-(a_m+\hat{a})\omega+b_mr\right)\\
&= a\omega-(a_m+\hat{a})\omega+b_mr+\frac{\bar{b}}{\hat{b}}(a_m+\hat{a})\omega-\frac{\bar{b}}{\hat{b}}b_mr\\
&= -(a_m+\bar{a})\omega+b_mr+\frac{\bar{b}}{\hat{b}}\left((a_m+\hat{a})\omega-b_mr\right)
\end{aligned}
$$

With the adaptation laws
$$
\dot{\hat{a}} = \gamma_1\omega e
$$
and
$$
\dot{\hat{b}} = \gamma_2v_{in}e
$$
the time derivative of the Lyapunov function
$$
v(e,\bar{a},\bar{b}) = \frac{1}{2}e^2 + \frac{1}{2\gamma_1}\bar{a}^2+\frac{1}{2\gamma_2}\bar{b}^2
$$
will be negative definite, where $$ \gamma_1 $$ and $$ \gamma_2 $$ are positive real values. To show this, the time derivative of the error term $$ e = \omega - \omega_m $$ is needed again:

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
\dot{v}(e,\bar{a},\bar{b})
&=e\dot{e}+\frac{1}{\gamma_1}\bar{a}\dot{\bar{a}}+\frac{1}{\gamma_2}\bar{b}\dot{\bar{b}}\\
&= e\left(-a_me-\bar{a}\omega+\frac{\bar{b}}{\hat{b}}\left((a_m+\hat{a})\omega-b_mr\right)\right)
 +\bar{a}\omega e+\bar{b}e v_{in}\\
&= -a_me^2
\end{aligned}
$$

---

##### Comparison

For both direct and indirect MRAC, the controller successfully drive the reference model to follow commanded square, sine, and sawtooth inputs, but the physical plant struggles to match the model dynamics, most likely due to the very fast model parameters ($$ a_m=b_m=10 $$). The best tracking is obtained for centered sine waves, where the plant output roughly follows the model with some amplitude and phase, but square and sawtooth inputs produce larger tracking errors due to the sharper transitions in the signals. For offset inputs, the plant output appears to collapse to a constant. Because the offset introduces a constant component in the tracking error, the adaptation laws integrate this error, and the estimates ramp at the cost of responding poorly to the oscillatory component

<div class="row mt-3">
  <div class="col-sm-6 mt-3 mt-md-0">
    {% include figure.liquid
      loading="eager"
      path="assets/img/direct-mrac-tracking.jpg"
      class="img-fluid rounded z-depth-1"
    %}
  </div>
  <div class="col-sm-6 mt-3 mt-md-0">
    {% include figure.liquid
      loading="eager"
      path="assets/img/indirect-mrac-tracking.jpg"
      class="img-fluid rounded z-depth-1"
    %}
  </div>
</div>
<div class="caption">
    Comparison of tracking performances between direct and indirect MRAC for a variety of wave forms.
</div>

---

#### Nonlinear MRAC

For the implemntation of nonlinear MRAC, it is assumed that the nonlinearities of the plant can be modeled by a radial basis function network such that:

$$
f(\omega)=\alpha^T \sigma(\omega) \quad\quad\quad g(\omega)=\beta^T \sigma(\omega)
$$

where $$ \alpha, \beta \in \mathbb{R}^q $$ are the weights for a network of radial basis functions (RBFs) $$ \sigma(\omega) = \begin{bmatrix}\rho_1(\omega)&...&\rho_q(\omega)\end{bmatrix}^T $$ where $$ \rho_i(\omega)=\exp(-(\epsilon(\omega-\omega_i))^2) $$ such that $$ \omega_i $$ is the center for each RBF and $$ \epsilon $$ is the width factor. The centers $$ \omega_i $$ are evenly spaced throughout the region of interests and $$ \epsilon = \frac{d}{2} $$ is initialized such that $$ d $$ is the distance between the centers. With this setup, and new weight estimates $$ \hat{\alpha} $$ and $$ \hat{\beta} $$, the resulting control law is:

$$
u=v_{in}=\frac{1}{\hat{\beta}^T \sigma(\omega)}(-\hat{\alpha}^T\sigma(\omega)-a_m\omega+b_mr)
$$

For stability, the Lyapunov function $$ v(e,\bar{\alpha},\bar{\beta})=\frac{1}{2}e^2+\frac{1}{2}\bar{\alpha}^T\Gamma_1^{-1}\bar{\alpha}+\frac{1}{2}\bar{\beta}^T\Gamma_2^{-1}\bar{\beta} $$ is chosen with the adaptation laws $$ \dot{\hat{\alpha}}=\Gamma_1\sigma(\omega)e $$ and $$ \dot{\hat{\beta}}=\Gamma_2\sigma(\omega)v_{in}e $$ where $$ \Gamma_1, \Gamma_2 \in \mathbb{R}^{q \times q} $$ are symmetric positive definite matrices. Again for analysis, the error terms are $$ e = \omega - \omega_m $$, $$ \bar{\alpha} = \hat{\alpha}-\alpha $$, and $$ \bar{\beta}=\hat{\beta}-\beta $$. Before proving $$ \dot{v}(e,\bar{\alpha},\bar{\beta}) \le 0 $$, the time derivative $$ \dot{e} $$ is expanded:

$$
\begin{aligned}
\dot{e}&=\dot{\omega}-\dot{\omega}_m\\
&= \alpha^T\sigma + \beta^T\sigma u + a_m\omega_m-b_mr\\
&= \alpha^T\sigma + \hat{\beta}^T\sigma u - \bar{\beta}^T\sigma u + a_m\omega_m - b_mr\\
&= \alpha^T\sigma - \hat{\alpha}^T\sigma - a_m\omega + b_mr -\bar{\beta}^T\sigma u + a_m\omega_m - b_mr\\
&= (\alpha^T\sigma-\hat{\alpha}^T\sigma)-a_m(\omega-\omega_m)-\bar{\beta}^T\sigma u\\
&= -a_me-\bar{\alpha}^T\sigma(\omega)-\bar{\beta}^T\sigma(\omega)u
\end{aligned}
$$

which is done using the control law relation $$ \hat{\beta}^T\sigma u = -\hat{\alpha}^T\sigma - a_m\omega + b_mr $$. The time derivative of the Lyapunov function (proving negative definiteness) is thus:

$$
\begin{aligned}
\dot{v}(e,\bar{\alpha},\bar{\beta})&=e\dot{e}+\bar{\alpha}^T\Gamma_1^{-1}\dot{\bar{\alpha}}+\bar{\beta}^T\Gamma_2^{-1}\dot{\bar{\beta}}\\
&= e(-a_me-\bar{\alpha}^T\sigma-\bar{\beta}^T\sigma u)+\bar{\alpha}^T\Gamma_1^{-1}\dot{\bar{\alpha}}+\bar{\beta}^T\Gamma_2^{-1}\dot{\bar{\beta}}\\
&= -a_me^2-e\bar{\alpha}^T\sigma - e\bar{\beta}^T\sigma u + \bar{\alpha}^T\Gamma_1^{-1}(\Gamma_1\sigma e)+\bar{\beta}^T\Gamma_2^{-1}(\Gamma_2\sigma u e)\\
&= -a_me^2
\end{aligned}
$$

using the relations $$ \dot{\bar{\alpha}} = \dot{\hat{\alpha}} $$ and $$ \dot{\bar{\beta}} = \dot{\hat{\beta}} $$.

The tracking of this controller is presented below; the biggest differences between the linear and nonlinear approaches involve the controller's reaction to the offset reference signals. The offset signals push the motor plant into a completely different nonlinear regime, and the linear MRAC assumption of $$ \dot{\omega}= a\omega+bv_{in} $$ results in poor performance. However, the nonlinear MRAC explicitly models these nonlinearities using RBFs, allowing the controller to estimate the nonlinear functions of $$ \omega $$ instead of the model constants.

<div class="row mt-3">
    <div class="col-12 col-md-7 mx-auto mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/nonlinear-mrac-tracking.jpg" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Tracking performances for the nonlinear-RBFN MRAC for the square, sine, and sawtooth reference signals.
</div>

The initial values for $$ \alpha $$ and $$ \beta $$ have significant effects on the results. The adaptations guarantees tracking stability, but not parameter convergence, so depending on the initial RBF weights, the controller may take a long time to become useful. If there was additional knowledge of the system dynamics, especially for the physics-based elements, the centers can be picked around regions where friction changes rapidly and $$ \epsilon $$ can be widened or narrowed to match expected values, which would reduce error and parameter drift. The biggest tradeoff is the size of the RBFN; smaller-dimension RBFs are under-parameterized which results in $$ \sigma(\omega) $$ being unable to represent the nonlinearities well. Thus, a moderate size must be tuned to allow enough flexibility to approximate the nonlinearities such that the parameter norms stay reasonable

---

### Sliding Mode Control

As opposed to adaptive control which seeks to estimate and adjust a control law to the unknown dynamics of a system, sliding mode control (SMC) forces the dynamics to conform to a predefined stable manifold within the subspace. Given the full system dynamics of the plant,

$$
\dot{\theta} = \omega \quad\quad\quad \dot{\omega}=f(\omega)+g(\omega)v_{in}
$$

the sliding surface $$ s = a\theta+\omega $$ with $$ a \ge 0 $$ is chosen. On the surface $$ s = 0 $$ we have:

$$
a\theta+\omega=0 \implies \omega = -a\theta
$$

With $$ \dot{\theta}=\omega $$, along the surface is:

$$
\dot{\theta}=-a\theta
$$

This is a stable first-order linear ODE with the solution $$ \theta(t)=\theta(t_0)e^{-a(t-t_0)} $$. Since $$ a \ge 0 $$, it is guaranteed that $$ \lim_{t\rightarrow \infty} \theta(t) = 0 $$. Therefore, if the state can be constrained to this surface, the state will go to zero. A key component of SMC is bounding the value:

$$
\left | \frac{a\omega-f(\omega)}{g(\omega)} \right | \le \rho(\omega)
$$

To bound this value with the electromechanical system, it is assumed that the system has aerodynamic drag and Coulomb friction with dynamics of the form:

$$
\dot{\omega}=bv_{in}-c_l\omega-c_a\omega^2-f_c\operatorname{sign}(\omega)
$$

Thus, in the initial SMC notation, $$ g(\omega) = b $$, $$ f(\omega)=-c_l\omega-c_a\omega^2-f_c\operatorname{sign}(\omega) $$ and the bounded value becomes:

$$
\left | \frac{(a+c_l)\omega+c_a\omega^2+f_c\operatorname{sign}(\omega)}{b} \right | \le \rho(\omega)
$$

Given that $$ v_{in} $$ has a maximum value of 14 V and the chosen control law $$ v_{in} = -\beta(\omega)\operatorname{sign}(s) $$ where $$ \beta(\omega) \ge \rho(\omega)+\beta_0 $$ and $$ \beta_0 > 0 $$, the inequality that relates the value $$ a $$ to the other model parameters as derived:

$$
|v_{in}|\le 14 \implies \beta(\omega) \le 14
\rho(\omega)+\beta_0 \le 14 \implies \left | \frac{(a+c_l)\omega+c_a\omega^2+f_c\operatorname{sign}(\omega)}{b} \right | + \beta_0 \le 14
$$

Finally, for a range of $$ \omega $$, $$ a $$ is chosen such that:

$$
|(a+c_l)\omega+c_a\omega^2+f_c\operatorname{sign}(\omega)| \le b(14-\beta_0)
$$

The model parameters for the following experiments are chosen as $$ b = 1 rad/s^2/V $$, $$ c_l = 0.01 1/s $$, $$ c_a = 0.025 1/rad $$, and $$ f_c = 2.5 m/s^2 $$.

--- 

#### SMC Experiments

Under the previously established assumptions, it is shown that the control law $$ v_{in} = -14\operatorname{sign}(s) $$ will work as a sliding mode controller for the system. Over the entire range of $$ \omega $$, the curve $$ \rho(\omega) $$ stays below the constraint $$ \beta = 14 $$ and the chosen control law is strong enough to dominate the worst-case drag and Coulomb friction and force trajectories toward the surface $$ s = 0 $$. For $$ a = 0.001 $$, $$ \rho(\omega) $$ is relatively small and there is tight chattering around zero speed with essentially no drift. In the second case of $$ a = 0.01 $$, there is more coupling between position and speed, so the average value of $$ \omega $$ shifts slightly away from zero as $$ \theta $$ evolves; however, the system still remains close to the sliding surface with similar chattering. 

<div class="row mt-3">
  <div class="col-sm-6 mt-3 mt-md-0">
    {% include figure.liquid
      loading="eager"
      path="assets/img/smc-a-0.001.jpg"
      class="img-fluid rounded z-depth-1"
    %}
  </div>
  <div class="col-sm-6 mt-3 mt-md-0">
    {% include figure.liquid
      loading="eager"
      path="assets/img/smc-a-0.01.jpg"
      class="img-fluid rounded z-depth-1"
    %}
  </div>
</div>
<div class="caption">
  SMC trajectories for the control law v = -14sign(s) showing fast convergence to the manifold.
</div>

As opposed to the previous cases, when $$ a = 0.1 $$, SMC breaks as $$ \rho(\omega) > \beta = 14 $$. The function $$ \omega(t) $$ does not hover around a constant value and instead slowly drifts upwards. Increasing $$ a $$ makes the sliding surface steeper in the state space and thus the controller has to fight harder against the plant nonlinearities.

<div class="row mt-3">
    <div class="col-12 col-md-7 mx-auto mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/smc-a-0.1.jpg" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Example SMC trajectory under the previous control law in which the inequality is violated.
</div>

--- 

#### Chatter

To make the trajectories of $$ \omega $$ less jarring, $$ \beta(x) $$ can be modified to be large enough to satisfy $$ \beta(x) > \rho(\omega) $$ but not too large as to not cause severe chatter. The constant $$ \beta = 14 $$ is much larger than needed for most $$ \omega $$ values and large $$ \beta $$ forces $$ v_{in} = -\beta\operatorname{sign}(s) $$ to switch violently. A new switching gain is designed as:

$$
\beta(x)=\rho(\omega)+\beta_{margin}
$$

where $$ \beta_{margin} $$ is a small positive constant. The new gain is also enforced by:

$$
\beta(x) = \max(\rho(\omega)+\beta_{margin},\beta_{min})
$$

with $$ \beta_{min} = 3 $$. The new design shows a much smoother trajectory and a smaller oscillation amplitude that preserves the sliding behavior

<div class="row mt-3">
  <div class="col-sm-6 mt-3 mt-md-0">
    {% include figure.liquid
      loading="eager"
      path="assets/img/smc-a-0.001-better.jpg"
      class="img-fluid rounded z-depth-1"
    %}
  </div>
  <div class="col-sm-6 mt-3 mt-md-0">
    {% include figure.liquid
      loading="eager"
      path="assets/img/smc-a-0.01-better.jpg"
      class="img-fluid rounded z-depth-1"
    %}
  </div>
</div>
<div class="caption">
  Modified SMC trajectories with a modified beta function integrated in the control law.
</div>

Another way of confronting the chatter is to add a smoothing function in the control law, which can be done by using:

$$
v_{in}=-\beta(x)\tanh(\alpha \omega)
$$

for varying $$ \alpha $$. The tanh controllers clearly give much smaller amplitude oscillations than previous controllers. By increasing $$ \alpha $$, the controller gains tighter tracking that is more robust but results in more chatter whereas decreasing $$ \alpha $$ leads to smoother control with less chatter but softer response. As $$ \alpha \rightarrow \infty $$, the tanh function begins to approximate the signum function, which was the original function inside the control law, and this evolution can be observed below.

<div class="row mt-3">
  <div class="col-sm-6 mt-3 mt-md-0">
    {% include figure.liquid
      loading="eager"
      path="assets/img/smc-a-0.001-tanh.jpg"
      class="img-fluid rounded z-depth-1"
    %}
  </div>
  <div class="col-sm-6 mt-3 mt-md-0">
    {% include figure.liquid
      loading="eager"
      path="assets/img/smc-a-0.01-tanh.jpg"
      class="img-fluid rounded z-depth-1"
    %}
  </div>
</div>
<div class="caption">
  Smoothing effects using the hyperbolic tangent function compared with previous SMC trajectories.
</div>
