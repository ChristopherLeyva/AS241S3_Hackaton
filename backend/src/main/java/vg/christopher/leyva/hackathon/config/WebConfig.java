package vg.christopher.leyva.hackathon.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.xml.MappingJackson2XmlHttpMessageConverter;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.lang.NonNull; 

import java.util.List;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void extendMessageConverters(@NonNull List<HttpMessageConverter<?>> converters) {
        converters.removeIf(c -> c instanceof MappingJackson2XmlHttpMessageConverter);
    }
}