<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class NotLoggedIn
{
    private Controller $controller;

    public function __construct(Controller $controller)
    {
        $this->controller = $controller;
    }
    
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if(!$this->controller->authUser()) {
            return response()->json([
                'error' => 'Login to start using the service',
            ], 401);
        }

        return $next($request);
    }
}
