<?php

/* modules/contrib/restui/templates/restui-resource-info.html.twig */
class __TwigTemplate_8be137671f475a24b29f4347e57787157c1dcb028383cc7eefab8d462c78b047 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 12
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable((isset($context["resource"]) ? $context["resource"] : null));
        foreach ($context['_seq'] as $context["method"] => $context["properties"]) {
            // line 13
            echo "  <p>";
            echo $this->env->getExtension('drupal_core')->escapeFilter($this->env, $context["method"], "html", null, true);
            echo "</br>
  authentication: ";
            // line 14
            echo $this->env->getExtension('drupal_core')->escapeFilter($this->env, twig_join_filter($this->getAttribute($context["properties"], "supported_auth", array()), ", "), "html", null, true);
            echo "</br>
  formats: ";
            // line 15
            echo $this->env->getExtension('drupal_core')->escapeFilter($this->env, twig_join_filter($this->getAttribute($context["properties"], "supported_formats", array()), ", "), "html", null, true);
            echo "</p>
";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['method'], $context['properties'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
    }

    public function getTemplateName()
    {
        return "modules/contrib/restui/templates/restui-resource-info.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  32 => 15,  28 => 14,  23 => 13,  19 => 12,);
    }
}
/* {#*/
/* /***/
/*  * @file*/
/*  * Default theme implementation for basic administrative info about a REST resource.*/
/*  **/
/*  * Available variables:*/
/*  * - resource: array REST resource.*/
/*  **/
/*  * @ingroup themeable*/
/*  *//* */
/* #}*/
/* {% for method, properties in resource %}*/
/*   <p>{{ method }}</br>*/
/*   authentication: {{ properties.supported_auth|join(', ') }}</br>*/
/*   formats: {{ properties.supported_formats|join(', ') }}</p>*/
/* {% endfor %}*/
/* */
