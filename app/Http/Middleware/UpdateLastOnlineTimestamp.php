<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UpdateLastOnlineTimestamp
{
    /**
     * Handle an incoming request.
     *
     * @param Closure(Request): (Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
		if (auth()->check()) {
			auth()->user()->update(['last_online_at' => now()]);
		}
        return $next($request);
    }
}
