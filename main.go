package main

import "fmt"
import "C"

//export plugin
func plugin(x string) {
	fmt.Printf("Hello from Go! Argument: %s\n", x)
}

func main() {}
