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
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('service_number');
            $table->string('name');
            $table->string('type'); // contract or adhoc
            $table->integer('technician_count');
            $table->string('service_no_of_time'); // 3 of 4
            $table->date('service_date');
            $table->string('service_time');
            $table->dateTime('service_at');
            $table->string('status');
            $table->unsignedBigInteger('contract_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
