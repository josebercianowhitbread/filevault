package whitbread.impl;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;
import whitbread.HelloWorld;

@Service(value = HelloWorld.class)
@Component(immediate=true)
public class HelloWorldImpl implements HelloWorld {


    public String getString() {
        return "Hello world";
    }
    
}
