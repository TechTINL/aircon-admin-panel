<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->string('assign')->nullable()->after('service_id');
            $table->integer('employee_id')->nullable()->after('assign');
            $table->string('hour')->nullable()->after('employee_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->dropColumn('assign');
            $table->dropColumn('employee');
            $table->dropColumn('hour');
        });
    }
};
