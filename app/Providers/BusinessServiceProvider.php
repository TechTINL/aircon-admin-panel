<?php

namespace App\Providers;

use App\Actions\ActivityAction\GetActivitiesAction;
use Illuminate\Support\ServiceProvider;

class BusinessServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(
            GetActivitiesAction::class,
            function () {
                return new GetActivitiesAction();
            }
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
