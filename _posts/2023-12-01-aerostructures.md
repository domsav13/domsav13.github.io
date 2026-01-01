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

First, the shear center of the cross-section will be calculated analytically. The shear flow $$ q(s) = \frac{-S_y}{I_{xx}} \int_0^s ty ds $$ is used where $$ t $$ is the section thickness, $$ S_y $$ is a placeholder force located on the shear center, $$ I_{xx} $$ is the second moment of area of the section about the x-axis, and $$ s $$ is the path of the shear flow. With $$ r = 25 $$ and $$ t = 2 $$, $$ I_{xx} $$ is calculated as:

$$
\begin{aligned}
I_{xx}
&= \frac{(2r)^3 t}{12}
+ 2\left(\frac{8 r t^3}{12} + 8 r^3 t\right)
+ 2 t r^3 \int_{0}^{\pi/2} \cos^2\theta \, d\theta \\
&= \frac{2}{3}r^3 t + 16 r^3 t
+ 2 r^3 t \int_{0}^{\pi/2} \cos^2\theta \, d\theta \\
&= r^3 t\left(\frac{2}{3}+16+\frac{\pi}{2}\right)=18.24r^3t
\end{aligned}
$$

with the thin-wall approximation ($t^i = 0$ for $i \ge 2$). Now the shear flow is calculated for each major part of the section. In wall 12, $y = s_1$:





This theme supports rendering beautiful math in inline and display modes using [MathJax 3](https://www.mathjax.org/) engine. You just need to surround your math expression with `$$`, like `$$ E = mc^2 $$`. If you leave it inside a paragraph, it will produce an inline expression, just like $$ E = mc^2 $$.

To use display mode, again surround your expression with `$$` and place it as a separate paragraph. Here is an example:

$$
\sum_{k=1}^\infty |\langle x, e_k \rangle|^2 \leq \|x\|^2
$$

You can also use `\begin{equation}...\end{equation}` instead of `$$` for display mode math.
MathJax will automatically number equations:

\begin{equation}
\label{eq:cauchy-schwarz}
\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)
\end{equation}

and by adding `\label{...}` inside the equation environment, we can now refer to the equation using `\eqref`.

Note that MathJax 3 is [a major re-write of MathJax](https://docs.mathjax.org/en/latest/upgrading/whats-new-3.0.html) that brought a significant improvement to the loading and rendering speed, which is now [on par with KaTeX](http://www.intmath.com/cg5/katex-mathjax-comparison.php).
