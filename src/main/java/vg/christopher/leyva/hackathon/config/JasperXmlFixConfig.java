package vg.christopher.leyva.hackathon.config;

import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;


@Configuration
public class JasperXmlFixConfig {

    @PostConstruct
    public void fixXmlParser() {
        System.setProperty(
            "javax.xml.parsers.DocumentBuilderFactory",
            "com.sun.org.apache.xerces.internal.jaxp.DocumentBuilderFactoryImpl"
        );
    }

}
