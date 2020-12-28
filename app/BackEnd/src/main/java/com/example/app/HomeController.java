package com.example.app;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
class WebConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**");
	}
}


@CrossOrigin
@RestController
@RequestMapping("")
public class HomeController {
	private DataN entit;
	private boolean flg;
	 public HomeController(){
	  entit=new DataN(0, 0, " ");
	  flg=false;
	 }

	@RequestMapping(value = "", produces = "application/json", method = RequestMethod.POST)
	public ResponseEntity<HttpStatus> dat(@RequestBody String jsonString) {
		JSONObject jsonObject=new JSONObject(jsonString);
		String firstNum=jsonObject.getString("first");
		String secondNum=jsonObject.getString("second");
		String op=jsonObject.getString("op");
		entit=new DataN(Double.parseDouble(firstNum),
				Double.parseDouble(secondNum),op);
        flg=true;
		return ResponseEntity.ok(HttpStatus.OK);
	}

	@GetMapping("/")
	public double home() {
		if(!flg){entit=new DataN(0, 0," ");}
		else{flg=false;}
		return entit.getResult();
	}

}



class DataN {
	private double first, second;
	private String op;

	public DataN(double first, double second, String op) {
		this.first = first;
		this.second = second;
		this.op = op;
	}

	public double getResult() {
		if("+-/*".contains(op)){
		ScriptEngineManager MEGA = new ScriptEngineManager();
		ScriptEngine Te = MEGA.getEngineByName("JavaScript");
		double h=0;
		try {
			String z=(first + "" + op + "" + second).replaceAll("--","+");
			h= Double.parseDouble(((Object) Te.eval(z)).toString());
		} catch (ScriptException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return h;}
		else{
			return Math.pow(first,0.5);
		}
	}
}
