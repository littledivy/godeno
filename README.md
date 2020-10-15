## Go <=> Deno

Write [Deno](https://deno.land) plugins in [Golang](https://golang.org). 

* Experimental, Deno plugins itself are unstable
* Build c-shared libraries of your Go code and call them in Deno.
* Simple API and ready-made code gluing.

### Usage

Write your Go -

```go
// go_deno.go
import "C"

//export gofunc
func gofunc(arg string) {
    // do stuff here...
}

func main() {}
```

...build as a c-shared library

```sh
go build -buildmode=c-shared -o mygolib.so
```

...and load and call it from Deno 

```typescript
// go_deno.ts
import { GoDeno } from "./mod.ts";
let plugin = new GoDeno("./mygolib.so");
plugin.dispatch("gofunc", "JS arg");
```

### Example

```sh
cd example/
go build -buildmode=c-shared -o hello.so
deno run -A --unstable ./hello.ts
```

### LICENSE

MIT License. Contributions welcome.
